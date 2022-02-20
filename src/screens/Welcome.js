import React, {useState, useEffect, useRef} from "react";
// import { v1 as uuid } from "uuid";
import { generateSlug } from "random-word-slugs";
import '../App.css'


//image
import limedrawlogo from '../assets/limedrawlogo.png'
import halloweenparty from '../assets/halloweenparty.png'
import fastlime from '../assets/fastlime.png'
import rotate from '../assets/rotate.png'
import jack from '../assets/jack.png'
import twopeople from '../assets/twopeople.png'
import sixpeople from '../assets/sixpeople.png'

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
import {IoPeople} from 'react-icons/io5'
import {FaPlay} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import {Howl} from 'howler';
import { GoogleLogin } from 'react-google-login';
import {AiOutlineClose} from 'react-icons/ai'
import axios from 'axios';

//sound
import bgsound from '../assets/spookybg.mp3'
import slidesound from '../assets/slide.mp3'
import classicClick from '../assets/classicClick.mp3'
import errorsound from '../assets/error.mp3'

const images = [defaults, scream, clown, girl, bear, medusa, jason]

const Welcome = (props) => {
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
    
    function create() {
        
        if (nickname === ''){
            errorSound.play()
            alert('Please type your nickname')
            
        } else {
            enterSound.play()
            audioBg.current.pause()
            // const roomid = uuid();

            const slug = generateSlug(3,  {
                format: "camel",
                partsOfSpeech: ["adjective", "adjective", "noun"],
                categories: {
                  adjective: ["color", "appearance"],
                  noun: ["animals"],
                },
              })
            
            const random =   Math.floor(Math.random() * (9999 - 1000) + 1000);
            const roomid = slug+random;

            props.history.replace({     
            pathname: `/room/${roomid}`,
            state:{
                nickname : nickname,
                character : character,
                roomType: 'private'
            }
           });

           
        }  
    }

    function joinGroup() {  
        const slug = generateSlug(3,  {
            format: "camel",
            partsOfSpeech: ["adjective", "adjective", "noun"],
            categories: {
              adjective: ["color", "appearance"],
              noun: ["animals"],
            },
          })
        
        const random =   Math.floor(Math.random() * (9999 - 1000) + 1000);
        const roomidTemp = slug+random; // just in case room is unavailable
        
        var roomid;
        axios.post(`https://limedrawapi.herokuapp.com/available-group`,{roomID: roomidTemp})
        .then(res => {
                roomid = res.data
                props.history.replace({     
                    pathname: `/room/${roomid}`,
                    state:{
                        nickname : nickname,
                        character : character,
                        roomType: 'public'
                    }
                });
        })
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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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

    const responseGoogle = (response)=>{
        console.log(response)
    }

    const [playType , setPlayType] = useState(0)
    const [playModal, setPlayModal] = useState(false)

    return (
        <div style={{width:'100vw', height:'100vh', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <div onClickCapture={togglePlaying} className="main" style={{ flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100vw', height:'100vh'}}>
            <audio 
                ref={audioBg} 
                src={bgsound} 
                autoPlay={true}
            ></audio>

            <div  style={{display:'flex', maxWidth:'50%',flexDirection:'flex-start', flexDirection:'column'}}>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <img style={{objectFit:'contain', width: '25%', height:'auto',}} src={limedrawlogo} alt="Logo" />
                    {/* <div style={{color:'white', display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end'}}>
                        <span style={{fontWeight:'bold', fontSize:14}}> By </span>
                        <img style={{objectFit:'contain', marginLeft:10, width: '18%', height:'auto'}} src={fastlime} alt="Logo" />
                    </div> */}
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

                                        <div className='play-button' onClick={()=>{ 
                                            if (nickname === ''){
                                                errorSound.play()
                                                alert('Please type your nickname')
                                            } else {
                                                enterSound.play()
                                                setPlayModal(true)}
                                            }
                                            
                                            } style={{cursor:'pointer', borderRadius:10, marginTop:20,  padding:10, justifyContent:'center', alignItems:'center', display:'flex'}}>
                                           <FaPlay/> 
                                           <span style={{marginLeft:10, fontWeight:'bold'}}>PLAY!</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* left */}
                            <div style={{display:'flex', justifyContent:'center', marginTop:20, flex:1, alignItems:'center',  flexDirection:'column'}}>
                                <div style={{width:'70%'}}>
                                    <div style={{ display:'flex', flexDirection:'column', flexDirection:'column'}}>
                                        <span style={{marginBottom:7, fontSize:12, color:'grey'}}>Create Room and invite friends!</span>

                                        <div onClick={()=>{create()}} className='createroom-button' style={{ display:'flex',borderRadius:10, padding:7, justifyContent:'center', alignItems:'center'}}>
                                            <IoPeople size={25}/> 
                                            <span style={{marginLeft:10}}>Create Room</span>
                                        </div>

                                        <GoogleLogin
                                            clientId="468439026905-56607m3tfuc46ij4abaoj2q8umotts7p.apps.googleusercontent.com"
                                            render={renderProps => (
                                                <div onClick={renderProps.onClick} className="google-login" style={{display:'flex', justifyContent:'center', alignItems:'center', padding:6, width:'auto', borderRadius:10}}>
                                                    <FcGoogle size = {25}/>
                                                    <span style={{fontWeight:'bold', color:'grey', marginLeft:10}}>Login</span>
                                                    
                                                </div>
                                            )}
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                        />
                                        
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
            
            {/* play modal */}
            {playModal &&
            <div style={{position:'absolute', backgroundColor:'rgba(0,0,0,0.5)', zIndex:1000, width:'100%', height:'100%', display: 'flex', justifyContent:'center', alignItems:'center'}}>
                <div style={{backgroundColor:'white',position:'relative', borderRadius:20, padding:20, display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
                    <AiOutlineClose onClick={()=>{setPlayModal(false)}} size={20} color="black" style={{position:'absolute', top:10, right:10}} />
                    <div style={{fontSize:20, fontWeight:'bold'}}>Let The Fun Begin {String.fromCodePoint(0x1F47B)}</div>
                    <div style={{color:'grey', margin:10, fontSize:15}}>Who do you wanna play with?</div>
                    
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <div onClick={()=>{setPlayType(0)}} style={{margin:15, backgroundColor:'white', boxShadow:'0px 0px 15px rgba(0,0,0,0.1)', border: playType==0 ?'2px solid #CD0094' : '0px solid #CD0094', borderRadius:15}}> 
                            <img style={{objectFit:'contain', marginLeft:10, width: 120, height:120}} src={twopeople} alt="match picture" />
                            <div style={{paddingBottom:5, fontWeight:'bold', fontSize:14}}>Random</div>  
                            <div style={{paddingBottom:20, color:'grey', fontSize:12}}>2 persons</div>          
           
                        </div>

                        <div onClick={()=>{setPlayType(1)}} style={{margin:15, backgroundColor:'white', boxShadow:'0px 0px 15px rgba(0,0,0,0.1)', border: playType==1 ?'2px solid #CD0094' : '0px solid #CD0094', borderRadius:15}}> 
                            <img style={{objectFit:'contain', marginLeft:10, width: 120, height:120}} src={sixpeople} alt="group picture" />
                            <div style={{paddingBottom:5, fontWeight:'bold', fontSize:14}}>Join Group</div>       
                            <div style={{paddingBottom:20, color:'grey', fontSize:12}}>Up to 6 persons</div>          
                        </div>
                    </div>

                    <div className='play-button' onClick={()=>{
                        if (playType === 1){
                            joinGroup()
                        } else {
                            errorSound.play()
                            alert('Feature coming soon... Join a group of random people for now.')
                        }

                    }} style={{cursor:'pointer',color:'white', paddingLeft:20, paddingRight:20, borderRadius:10, marginTop:20,  padding:10, justifyContent:'center', alignItems:'center', display:'flex'}}>
                            <FaPlay/> 
                            <span style={{marginLeft:10, fontWeight:'bold'}}>START</span>
                        </div>
                </div>
            </div>
            }

        </div>
    );
};

export default Welcome;
