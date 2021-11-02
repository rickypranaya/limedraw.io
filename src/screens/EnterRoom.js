import React, {useState, useEffect, useRef} from "react";
import '../App.css'
//image
import limedrawlogo from '../assets/limedrawlogo.png'
import halloweenparty from '../assets/halloweenparty.png'
import fastlime from '../assets/fastlime.png'
import rotate from '../assets/rotate.png'
import jack from '../assets/jack.png'

//character
import bear from '../assets/bear.png'
import scream from '../assets/scream.png'
import clown from '../assets/clown.png'
import girl from '../assets/girl.png'
import defaults from '../assets/default.png'
import medusa from '../assets/medusa.png'
import jason from '../assets/jason.png'

//components
import Constant from "../components/Constant";

//import package
import Slider from 'react-slick'
import {FaArrowRight, FaArrowLeft} from 'react-icons/fa'
import {FaPlay} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import {Howl} from 'howler';


//sound
import bgsound from '../assets/spookybg.mp3'
import slidesound from '../assets/slide.mp3'
import errorsound from '../assets/error.mp3'
import classicClick from '../assets/classicClick.mp3'

const images = [defaults, scream, clown, girl, bear, medusa, jason]

const EnterRoom = (props) => {

    const audioBg = useRef(null)
    const [playing, setPlaying] = useState(false);
    const togglePlaying = () => setPlaying((prev) => !prev);

    var sound = new Howl({
        src: [slidesound]
    });

    var errorSound = new Howl({
        src: [errorsound]
    });

    var enterSound = new Howl({
        src: [classicClick]
    });



    useEffect(() => {
        audioBg.current.volume = 0.4
        if (audioBg && audioBg.current) {
            if (playing) {
                audioBg.current.play();
            }
        }
      }, [playing]);
    

    function enter() {
        if(nickname === ''){
            errorSound.play()
            alert('Please type in your nickname')
        } else {
            enterSound.play()
            audioBg.current.pause()
            var roomID = props.match.params.roomID;
        
            props.history.replace({     
                pathname: `/room/${roomID}`,
                state:{
                    nickname : nickname,
                    character : character
                }
            });
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }


    const NextArrow = ({onClick})=>{
        return(
            <div className="arrow next" onClickCapture={onClick}>
                <FaArrowRight  size={25}/>
            </div>

        )
    }

    const PrevArrow = ({onClick})=>{
        return(
            <div className="arrow prev" onClickCapture={onClick}>
                <FaArrowLeft  size={25}/>
            </div>

        )
    }

    const [imageIndex, setImageIndex] = useState(0)
    const [character, setCharacter] = useState('Pumpkin Head')
    const [nickname, setNickname] = useState('')

    const onSlide=(next)=>{
        sound.play()
        setImageIndex(next)
        
        var char;
        switch (next) {
            case 0:
                char ="Pumpkin Head"
                break;
            case 1:
                char ="Ghostface"
                break;
            case 2:
                char ="The Clown"
                break;
            case 3:
                char ="Axe Girl"
                break;
            case 4:
                char ="Killer Teddy"
                break;
            case 5:
                char ="Medusa"
                break;
            case 6:
                char ="jason voorhees"
                break;
            default:
                break;
        }
        setCharacter(char)
    }

    const settings ={
        infinite: true,
        lazyLoad: true,
        speed: 300,
        slidesToShow: 3,
        centerMode : true,
        centerPadding : 0,
        nextArrow : <NextArrow/>,
        prevArrow : <PrevArrow/>,
        beforeChange : (current, next) => onSlide( next)
    }

    // const onEnter = async (event)=>{
    //     event.preventDefault();
    // }

    return (
        <div style={{width:'100vw', height:'100vh', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <div onClickCapture={togglePlaying} className="main" style={{ flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100vw', height:'100vh'}}>
                      <audio 
                ref={audioBg} 
                src={bgsound} 
                autoPlay={true}
            ></audio>
            <div style={{display:'flex', maxWidth:'50%',flexDirection:'flex-start', flexDirection:'column'}}>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <img style={{objectFit:'contain', width: '25%', height:'auto',}} src={limedrawlogo} alt="Logo" />
                    <div style={{color:'white', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end'}}>
                        <span style={{fontWeight:'bold'}}> By </span>
                        <img style={{objectFit:'contain', marginLeft:10, width: '18%', height:'auto'}} src={fastlime} alt="Logo" />
                    </div>
                </div>

                <div style={{backgroundColor: Constant.LIGHTER_GREY, padding: 20, borderRadius:15, marginTop:16, display:'flex', alignItems:'center', flexDirection:'column'}}>
                    <img style={{objectFit:'contain',  position:'relative',  top:-40, width:'30%', height:'auto'}} src={halloweenparty} alt="Logo" />

                    <span style={{color:'white', marginBottom:10, fontSize:17, color:'grey'}}>
                        Choose your character!
                    </span>

                    {/* ====slider=== */}
                    <div className='slider' style={{ width:'80%'}}>
                        <Slider {...settings}>
                            {images.map((img, idx)=>{
                                return (
                                    <div key={idx} className={idx === imageIndex? "slide activeSlide" : "slide"}>
                                        <img style={{borderRadius:20}} src={img} alt={img} />
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>

                    <span style={{color:'white', marginTop:10, marginBottom:10, fontSize:14}}>
                        {character}
                    </span>

                    <div style={{ display:'flex', width:'100%'}}>

                            {/* left */}
                            <div style={{borderRight:"1px solid #505050", display:'flex', marginTop:20, flex:1, alignItems:'center', justifyContent:'center',  flexDirection:'column'}}>
                                <div style={{width:'70%'}}>
                                    <div style={{color:'white',  display:'flex', flexDirection:'column', flexDirection:'column'}}>
                                        <span style={{marginBottom:7, alignSelf:'flex-start'}}>Nickname</span>

                                        <input
                                            onFocus={()=>{
                                                setNickname('')
                                            }}
                                            onChange={(val)=>{
                                                setNickname(capitalizeFirstLetter(val.target.value))
                                            }}
                                            name='message' 
                                            className='input-nickname' 
                                            placeholder='nickname' 
                                            value={nickname}
                                        />

                                        <div className='play-button' onClick={()=>{enter()}} style={{cursor:'pointer', borderRadius:10, marginTop:20,  padding:10, justifyContent:'center', alignItems:'center', display:'flex'}}>
                                           <FaPlay/> 
                                           <span style={{marginLeft:10, fontWeight:'bold'}}>Enter Room</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* left */}
                            <div style={{display:'flex', justifyContent:'center', marginTop:20, flex:1, alignItems:'center',  flexDirection:'column'}}>
                                <div style={{width:'70%'}}>
                                    <div style={{ display:'flex', flexDirection:'column', flexDirection:'column'}}>

                                        <div className="google-login" style={{display:'flex', justifyContent:'center', alignItems:'center', padding:6, width:'auto', borderRadius:10}}>
                                            <span style={{fontWeight:'bold', color:'grey', marginRight:10}}>Login</span>
                                            <FcGoogle size = {25}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="smallscreen">
                <img className="smallscreen-img" style={{objectFit:'contain'}} src ={jack} alt={"character"}/>
                <div style={{color:'lightgrey', fontSize:'1.2rem', maxWidth:'80%',  marginTop:20, marginBottom:20}}>
                    Opps.. open from your Desktop or Tablet
                </div>
                <div style={{color:'grey', fontSize:'1rem', maxWidth:'80%',}}>
                    We're coming to your phone soon!
                </div>
            </div>

            <div className="rotatescreen">
                <img className="rotatescreen-img" style={{objectFit:'contain', width:'30%', height:'auto'}} src ={rotate} alt={"rotate screen"}/>
                <div style={{color:'lightgrey', fontSize:'1.4rem', maxWidth:'80%',  marginTop:20, marginBottom:20}}>
                    Rotate your screen
                </div>
            </div>


        </div>
    );
};

export default EnterRoom;
