import React, {useEffect, useRef} from 'react'
import useState from 'react-usestateref'
import 'intro.js/introjs.css';
import { Steps } from 'intro.js-react';

//components
import Constant from '../components/Constant';

//picture
import limedrawlogo from '../assets/limedrawlogo.png'
import halloweenparty from '../assets/halloweenparty.png'
import ghost1 from '../assets/1.jpg'
import rotate from '../assets/rotate.png'
import jack from '../assets/jack.png'
import boo from '../assets/boo.png'

//character
import bear from '../assets/bear.png'
import scream from '../assets/scream.png'
import clown from '../assets/clown.png'
import girl from '../assets/girl.png'
import defaults from '../assets/default.png'
import medusa from '../assets/medusa.png'
import jason from '../assets/jason.png'
import nenek from '../assets/nenek.png'

import bearnobg from '../assets/bearnobg.png'
import screamnobg from '../assets/screamnobg.png'
import clownnobg from '../assets/clownnobg.png'
import girlnobg from '../assets/girlnobg.png'
import defaultsnobg from '../assets/defaultnobg.png'
import medusanobg from '../assets/medusanobg.png'
import jasonnobg from '../assets/jasonnobg.png'

//icon
import {AiFillTrophy} from 'react-icons/ai';
import {RiPencilFill} from 'react-icons/ri';
import {BsEraserFill} from 'react-icons/bs';
import {IoMdLogOut} from 'react-icons/io';
import {SiGhostery} from 'react-icons/si'
import {AiOutlineClose} from 'react-icons/ai'
import {FaPlay } from 'react-icons/fa'
import {IoMdVolumeHigh} from 'react-icons/io'
import {IoMdVolumeOff} from 'react-icons/io'
import {BsFillMicFill} from 'react-icons/bs'
import {BsFillMicMuteFill} from 'react-icons/bs'
import {BsCameraVideoFill} from 'react-icons/bs'
import {BsCameraVideoOffFill} from 'react-icons/bs'

//sound
import sound1 from '../assets/sound1.mp3'
import bgmusics from '../assets/bgmusic.mp3'
import ticking from '../assets/ticking.mp3'
import ding from '../assets/ding.mp3'
import answerDing from '../assets/answer.mp3'
import shoutwin from '../assets/shoutwin.mp3'
import winsound from '../assets/winsound.mp3'
import change from '../assets/changeSound.mp3'
import errorsound from '../assets/error.mp3'

//import packages
import io from 'socket.io-client'
import Peer from 'simple-peer'
// import {Howl} from 'howler';
import { v1 as uuid } from "uuid";
import { useHistory } from 'react-router';
import { useLocation} from "react-router-dom";
import { generateSlug } from "random-word-slugs";
// import Peer from 'peerjs';


//socket connection
const USERID = uuid();
// const socket = io.connect('https://api.limedraw.io/')
// const socket = io.connect('http://localhost:5000/')


// to render chat bubbles
const RenderBubbles =({item})=>{
    var align;
    var me;
    var color;

    if (item.userid === USERID){
        color = Constant.LIGHTER_GREY
        align ='flex-end'
        me=true
    } else {
        color=Constant.PRIMARY_COLOR
        me=false
        align = 'flex-start'
    }

    return(   
        <div style={{alignSelf: align, display:'flex', flexDirection:'row', alignItems:'flex-end', marginTop:6, marginBottom:6, paddingLeft:16, paddingRight:11}}>
            {!me &&
                <img style={{objectFit:'cover', width:30, height:30,marginRight:10, borderRadius:8}} src={item.profile} alt="Logo" />
            }   

            {item.status === 1 &&
            <div style={{alignSelf: align, color:'white', borderRadius:8, paddingTop:6, paddingBottom:6, paddingLeft:0, paddingRight:0, textAlign: 'left', fontSize:14}}>
                <span style={{color:'#50F256'}}> { me ?  'You guess it right!' : item.username + " guess it right!"} </span> 
            </div> 
            }

            {item.status === 2 &&
            <div style={{alignSelf: align, color:'white', borderRadius:8, paddingTop:6, paddingBottom:6, paddingLeft:0, paddingRight:0, textAlign: 'left', fontSize:14}}>
                <span style={{color:'orange'}}> { me ?  'Welcome to the party!' : item.username + " has joined the party!"} </span> 
            </div> 
            }

            {item.status === 3 &&
            <div style={{alignSelf: 'flex-start', color:'white', borderRadius:8, paddingTop:6, paddingBottom:6, paddingLeft:0, paddingRight:0, textAlign: 'left', fontSize:14}}>
                <span style={{color:'orange'}}> { item.username + " left the party!"} </span> 
            </div> 
            }

            <div style={{ display:'flex', flexDirection:'column'}}>
                {!me && item.status === 0 &&
                    <div style={{textAlign: 'left',  color:"lightgrey", fontSize:11, marginBottom:3}}>{item.username}</div>
                }

                {item.status === 0 &&
                <div style={{alignSelf: align, maxWidth:'70%', color:'white', backgroundColor: color, borderRadius:8, paddingTop:6, paddingBottom:6, paddingLeft:15, paddingRight:15, textAlign: 'left', fontSize:14}}>
                   <span style={{maxWidth:'70%'}}>{item.answer} </span> 
                </div> 
                }
            </div>
        </div>        
    )
}


// to render points item
const RenderPoints = ({item, idx, socketid})=>{
    const user = item.user

    return(
        <div style={{backgroundColor: item.id === socketid ? Constant.LIGHTER_GREY : Constant.DARKER_GREY, display:'flex', alignItems:'center', justifyContent:'space-between', paddingRight:16, paddingLeft:10, borderRadius:5}}>
            <div style={{display:'flex', alignItems:'center', }}>

                { idx === 0 &&
                    <AiFillTrophy size ='15' color="#FFC700" />
                }

                { idx === 1 &&
                    <AiFillTrophy size ='15' color="#C9C9C9" />
                }

                { idx === 2 &&
                    <AiFillTrophy size ='15' color="#D17100" />
                }

                {idx !==0 && idx !==1 && idx !==2 &&
                    <div style={{width:15, height:15}}/>
                }

                <img style={{objectFit:'cover', width:60, height:60, marginTop:5, marginBottom:5,marginRight:10,marginLeft:10, borderRadius:5}} src={user.profile} alt="Logo" />
                <span style={{color:'white', fontSize:14,textAlign:'left', maxWidth:150}}>{user.username}</span>
            </div>
            <div style={{color: user.points >=0 ? 'orange' : 'red', fontSize:13}}>
                {user.points} pt
            </div>
        </div>
    )
}

//to render video
const Video = (props) => {
    const ref = useRef();
    
    useEffect(() => {
        if (props.peer.peer){
            props.peer.peer.on("stream", stream => {
                ref.current.srcObject = stream;
            })
    
            props.peer.peer.on('error', (err) => {
                props.peer.peer.destroy()
            })
    
            props.peer.peer.on("close", () => {
                props.peer.peer.destroy()
            })
        }
    }, []);


    // useEffect(()=>{
    //     console.log(props.peer)
    //     props.peer.peer.on('stream', userVideoStream =>{
    //         ref.current.srcObject = userVideoStream
    //         ref.current.addEventListener('loadedmetadata',()=>{
    //             ref.current.play()
    //         })
    //     })
    
    //     props.peer.peer.on('close', ()=>{
    //         ref.current.remove()
    //     })
    // },[])

return (
    <div style={{position:'relative',marginLeft:10, marginRight:10, marginBottom: 5, height: props.height, width: props.width }}>
        <video id="videoElement" style={{backgroundColor:'#444', border:props.drawer === props.peer.peerID ?'4px solid #CD0094': '0px', borderRadius:10,height: props.height, width: props.width , justifyContent:'center', objectFit:"cover"}}  ref={ref} autoPlay playsInline />
        <div style={{color:'white', position:'absolute',  bottom:'3%', left:'5%', backgroundColor:'rgba(0,0,0,0.4)', paddingTop:2, paddingBottom:2, paddingLeft:5, paddingRight:5, borderRadius:3, fontSize:14}}>
            {props.peer.mute === true && <BsFillMicMuteFill color="#FF4A4A" size={15}/>}
            { props.peer.username}
        </div>

        <div style={{ display: props.scare? 'flex': 'none', color:'white', position:'absolute', top:0, right:0, }}>
            <img style={{ width:'auto', height:60,}} src={boo} alt="boo!" />
        </div>
    </div>
);
}


// main function
function Main (props) {

    //* iNITIALIZATION *

    const socketRef = useRef();
    
    //window size
    const [width, setWindowWidth] = useState(0)
    const [height, setWindowHeight] = useState(0)

    //canvas ref
    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    //video container size
    const [videoWidth, setVideoWidth] = useState(0)
    const [videoHeight, setVideoHeight] = useState(0)

    // answer data
    const [answer, setAnswer] = useState('')
    const [answerData, setAnswerData] = useState([])

    //peers users
    const [peers, setPeers, peersReff] = useState([])
    // const peersRef = useRef([])
    const [peersCall, setPeersCall] = useState({})
    const [users, setUsers] = useState([])

    // ========= Video webrtc ===========

    // const socketRef = useRef();
    const userVideo = useRef();
    // const videoRef = useRef([])
    const roomID = props.match.params.roomID;
    const [userName, setUserName] = useState('')
    const [character, setCharacter] = useState('')
    const [roomType, setRoomType] = useState('')

    //Back button press
    let history = useHistory();
    let location = useLocation();
    const [isBackButtonClicked, setBackbuttonPress] = useState(false)

    //invite
    const [isInvite, setInvite] = useState(false)

    //myself object 
    const [myself, setMyself] = useState({})

    //when user click invite buttton
    const invite = ()=>{
        setInvite(true)
        navigator.clipboard.writeText("https://limedraw.io/enter/"+roomID)
    }

    //when user press logout button
    const logout = ()=>{
        errorSound.play()
        if (window.confirm("Do you wanna leave this room?")) {
            socketRef.current.emit("logout")
            // userVideo.current = null
            window.localStream.getTracks().forEach((track) => {
                track.stop();
            });

            history.replace("/")
          } else {
            window.history.pushState(null, null, window.location.pathname);
          }
    }

    // when user pressed back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
    
        // //logic for showing popup warning on page refresh
        // window.onbeforeunload = function () {    
        //   return "Are you sure to leave this room?";
        // };
        return () => {
          window.removeEventListener('popstate', onBackButtonEvent);
        }
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const onBackButtonEvent = (e) => {
        e.preventDefault();
        if (!isBackButtonClicked) {
            errorSound.play()
          if (window.confirm("Do you wanna leave this room?")) {
            setBackbuttonPress(true)
            socketRef.current.emit("logout")
            // userVideo.current = null
            window.localStream.getTracks().forEach((track) => {
                track.stop();
            });

            history.goBack()
          } else {
            window.history.pushState(null, null, window.location.pathname);
            setBackbuttonPress(false)
          }
        }
      }

    // update dimension when resize
    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions );
        return () => window.removeEventListener("resize",updateDimensions);
    }, []);

    //update dimension function
    const updateDimensions = () => {
        const width = window.innerWidth
        const height = window.innerHeight

        resizeVideo();
        var size = peers.length >=3 ? (height - 140) *0.4 * 0.8/7 : (height - 140) *0.45 * 0.8/7
        setToolChildSize(size)
        setWindowWidth(width)
        setWindowHeight(height)
    }

    //resize the video dimensions
    const resizeVideo = ()=>{
        const width = (window.innerWidth - 320) * 0.4
        const height = peersReff.current.length >= 3 ? (window.innerHeight - 50) *0.45 *0.8 :  (window.innerHeight - 50) *0.4 *0.8

        if(peersReff.current.length <=1){
            setVideoWidth(width)
            setVideoHeight(height)
        } else if (peersReff.current.length === 2) {
            setVideoWidth(width * 0.7)
            setVideoHeight(height /1.2)
        } else if (peersReff.current.length >= 3){
            setVideoWidth(width * 0.6)
            setVideoHeight(height /2)
        }else {
            setVideoWidth(width * 0.6)
            setVideoHeight(height / 2)
        }

    }

    // update video size when add peers
    useEffect(()=>{
        resizeVideo();
    },[peers])

    // =================== CANVAS ============================
    const [tool, setTool]=useState('pencil')
    const [lineWidth, setLineWidth] = useState (4)
    const [color, setColor] = useState('black')
    const [isDrawing, setIsDrawing] = useState(false)
    const canvasPlace = useRef(null)

    useEffect(()=>{        
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
                
        const handleResize = e => {
            var cheight = (window.innerHeight - 50) *0.5
            var cwidth = (window.innerWidth - 320) * 0.85 * 0.9

            context.canvas.width = cwidth*2 ;
            context.canvas.height = cheight*2 ;

            canvas.style.width = cwidth;
            canvas.style.height = `${cheight}px`;

            canvasPlace.current.style.width = cwidth;
            canvasPlace.current.style.height = `${cheight}px`;

            context.scale(2,2)
            context.lineWidth = lineWidth
            context.strokeStyle = color
            context.lineCap = "round"
        };       

        handleResize();
        window.addEventListener("resize", handleResize);
        contextRef.current = context;

        return () => window.removeEventListener("resize", handleResize);
    },[])

    //function to start drawing
    const startDrawing = ({nativeEvent})=>{
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    //function when finish drawing
    const finishDrawing = ()=>{
        setIsDrawing(false)
        contextRef.current.closePath()

        var dataImg = canvasRef.current.toDataURL("image/png");
        socketRef.current.emit("canvas-data", {room: roomID, data: dataImg})

    }

    //function when drawing
    const draw = ({nativeEvent}) =>{
        if (!isDrawing){
            return
        }

        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }
    //======================================================

    //========== CANVAS TOOL ===============
    //to change the color
    const changeColor = (clr)=>{
        if (tool !== 'eraser'){
            contextRef.current.strokeStyle = clr
        } else {
            setTool('pencil')
            contextRef.current.strokeStyle = clr
            contextRef.current.lineWidth = lineWidth
        }
    }

    //to change the linewidth
    const changelineWidth = (w)=>{
        if (tool !== 'eraser'){
            contextRef.current.lineWidth = w
        }
    }

    //to change eraser or pencil
    const changeTool = (tool)=>{
        setTool(tool)
        if (tool === "eraser"){
            contextRef.current.strokeStyle = 'white'
            contextRef.current.lineWidth = 20
        } else {
            contextRef.current.strokeStyle = color
            contextRef.current.lineWidth = lineWidth
        }
    }
    //======================================

    //============== jumpscare =============
    const [jumpButton, setJumpButton] = useState(true)
    const [isjumpscare, setIsjumpscare] = useState(false)
    const [scare, setScare] = useState(false)
    // var sound = new Howl({
    //     src: [sound1]
    // });

    // var tickingSound = new Howl({
    //     src: [ticking],
    //     volume:0.5
    // });

    // var dingSound = new Howl({
    //     src: [ding],
    //     volume:0.3
    // });

    // var answerSound = new Howl({
    //     src: [answerDing],
    //     volume:0.5
    // });

    // var winSound1 = new Howl({
    //     src: [winsound],
    //     volume:0.5
    // });

    // var winSound2 = new Howl({
    //     src: [shoutwin],
    //     volume:0.5
    // });

    // var changeSound = new Howl({
    //     src: [change],
    //     volume:0.5
    // });

    // var errorSound = new Howl({
    //     src: [errorsound]
    // });
    
    //when jumpscare activated
    const jump = ()=>{
        setIsjumpscare(true)
        sound.play()
        setTimeout(() => {
            setIsjumpscare(false)
        }, 3000);
    }

    //when user press jump button
    const onJump = ()=>{
        setJumpButton(false)
        socketRef.current.emit("jumpscare", roomID)
        setScare(true)
        setTimeout(() => {
            setScare(false)
        }, 3000);
    }
    //==============================================

    // ============= Background Music ==============
    // const audioBg = useRef(null)
    var sound = new Audio(sound1)
    var tickingSound = new Audio(ticking)
    var dingSound = new Audio(ding)
    var answerSound = new Audio(answerDing)
    var winSound1 = new Audio(winsound)
    var winSound2 = new Audio(shoutwin)
    var changeSound = new Audio(change)
    var errorSound = new Audio(errorsound)
    
    const [playing, setPlaying, playingRef] = useState(false);
    const togglePlaying = () => setPlaying((prev) => !prev);

    // useEffect(() => {
    //     audioBg.current.volume = 0.04
    //     if (audioBg && audioBg.current) {
    //         if (playing) {
    //             audioBg.current.play();
    //         } else {
    //             audioBg.current.pause();
    //         }
    //     }
    //   }, [playing]);


    //================= video chat===================
    useEffect(()=>{
    if (location.state){
        socketRef.current = io.connect('https://limedrawapi.herokuapp.com/');
        // socketRef.current = io.connect('http://localhost:5000/');


        var image;
        var imagenobg;
        switch (location.state.character) {
            case "Pumpkin Head":
                image = defaults
                imagenobg = defaultsnobg
                break;
            case "Ghostface":
                image = scream
                imagenobg = screamnobg
                break;
            case "The Clown":
                image = clown
                imagenobg = clownnobg
                break;
            case "Axe Girl":
                image = girl
                imagenobg = girlnobg
                break;
            case "Killer Teddy":
                image = bear
                imagenobg = bearnobg
                break;
            case "Medusa":
                image = medusa
                imagenobg = medusanobg
                break;
            case "jason voorhees":
                image = jason
                imagenobg = jasonnobg
                break;
            default:
                break;
        }

        setUserName(location.state.nickname)
        setRoomType(location.state.roomType)
        setCharacter(image)

        var userJoin = {
            userid: USERID,
            username: location.state.nickname ,
            profile : image,
            profilenobg: imagenobg,
            points: 0,
            status :2,
            mute: false
        }

        setMyself({id: socketRef.current.id, username: location.state.nickname})
        
        //=========== peer js start ==========
        // const myPeer = new Peer(socketRef.current.id,{
        //     host: '/',
        //     port: '3030'
        // }); 

        // myPeer.on('open', id=>{
        //     socketRef.current.emit("join room", {roomID: roomID, user: userJoin, peerID: id});
        // })
        //============ peer js end =============
        

        userVideo.current.muted=true

        function addVideoStream(video, stream) {
            video.srcObject = stream
            video.addEventListener('loadedmetadata',()=>{
                video.play()
            })
        }

        //=========== peer js start ==========

        // function connectToNewUser (user, userId, stream){
        //     console.log(user)
        //     const peer = myPeer.call(userId, stream)

        //     setPeers(peers=> [{peerID: userId, username: user.user.username, mute : user.user.mute, peer:peer}])
        //     // peersCall[userId] = call
        //     // setPeersCall(peersCall)
        // }

        //============ peer js end =============
    
        navigator.mediaDevices.getUserMedia(
            {
                video: {
                    width: 1280,
                    height: 720,
                    facingMode: "user",
                    frameRate: {
                        ideal: 60,
                        min: 10
                    }
                },
                audio:true}
            ).then(stream =>{
                addVideoStream(userVideo.current, stream)

            // =============== peer js start ================
                
                // myPeer.on('call', call=>{
                //     call.answer(stream)
                //     setPeers([...users, call])
                // })

                // socketRef.current.on('user-connected', data=>{
                //     if (data.roomID === roomID){
                //         var contactlist = data.user.filter(obj => obj.id !== socketRef.current.id);
                //         var peersList=[]
                //         contactlist.forEach(user=>{
                //             const peer = myPeer.call(data.userid, stream)
                //             peersList.push({peerID: data.userid, username: user.user.username, mute : user.user.mute, peer:peer})            
                //             // connectToNewUser(user, data.userid, stream)      
                //         })

                //         setPeers(peersList)

                        
                //     }
                // })

            //================= peer js end ====================

            // attach this stream to window object so can be used later
            window.localStream = stream;

            //first start video is close
            window.localStream.getVideoTracks()[0].enabled = false
            
            //when first joining room
            socketRef.current.emit("join room", {roomID: roomID, roomType:location.state.roomType ,user: userJoin});
            
            // ====== receive peers object from socket ================================
            socketRef.current.on("peers", data=>{
                if (data.roomID === roomID) {
                    const peersList = [];
                    var contactlist = data.user.filter(obj => obj.id !== socketRef.current.id);
                    contactlist.forEach(user=>{
                        const peer = createPeer(user.id, socketRef.current.id, stream);
                        peersList.push({
                            peerID: user.id,
                            username: user.user.username,
                            mute : user.user.mute,
                            peer: peer,
                        });        
                    })

                    setPeers(peersList)       
                }         
            })

            socketRef.current.on("user joined", payload =>{       
                const peer = addPeer(payload.signal, payload.callerID, stream);   
            })

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersReff.current.find(p => p.peerID === payload.id);
                if (item){
                    item.peer.signal(payload.signal);
                }     
            }); 

            // =================================================================

            socketRef.current.on("jumpscare", roomId=>{
                if (roomId === roomID){
                    jump()
                }
            })
    
            socketRef.current.on("all answer", roomId=>{
                if (roomId === roomID){
                    onAllAnswer()
                }
            })
    
            socketRef.current.on("next drawer", data=>{
                if (data.roomID === roomID && userSnapshot.current.length !== 0){
                    
                    var counter = drawerCounter.current
                    var dividend = userSnapshot.current.length
                    var index = counter % dividend
                    // console.log("---------------")
                    // console.log(counter)
                    // console.log(data.userSnapshot)
                    // console.log("index= "+ index)
    
                    // setDrawer(drawer=> data.userSnapshot[index])
                    drawerRef.current = userSnapshot.current[index]        
    
                    if (userSnapshot.current[index].id === socketRef.current.id){
                        if (playingRef.current){
                            changeSound.play()
                        }
                        
                        
                        setDrawWord('')
                        setDrawModal(true)
                        setCanvasOn(true)
                        setStart(true)
                    }
                }
            })
    
            socketRef.current.on("add point", data=>{
                if (data.roomID === roomID){
    
                    // dingSound.play()
                    if (data.user[0].id === socketRef.current.id){
                     setJumpButton(true)
                    } else {
                     setJumpButton(false)
                    }
                    setUsers(data.user)
                }
            })
    
            socketRef.current.on("minus point", data=>{
                if (data.roomID === roomID){
    
                    // dingSound.play()
                    if (data.user[0].id === socketRef.current.id){
                     setJumpButton(true)
                    } else {
                     setJumpButton(false)
                    }
                    setUsers(data.user)
                }
            })
    
            socketRef.current.on("game over", data=>{
                if (data.roomID === roomID){
                    onGameOver(data.user[0].user)
                }
            })
    
            socketRef.current.on("playagain", data=>{
                if (data.roomID === roomID){
                    setUsers(data.snapshot)
    
                    // setDrawer(data.snapshot[0])
                    drawerRef.current = data.snapshot[0]
                }
            })
    
            socketRef.current.on("start", data=>{
                if (data.roomID === roomID){
                    setStart(true)
                    setCanvasOn(true)
    
                    // setDrawer(data.user)
                    // drawerRef.current = data.user
                    drawerRef.current = userSnapshot.current[0]
                }
            })
            socketRef.current.on("updateRef",data=>{
                setPeers(data)
            })
    
            socketRef.current.on("mute", data=>{
                if (data.roomID === roomID){
                    const idx = peersReff.current.findIndex(p => p.peerID === data.id);
                    if(idx > -1){
                        peersReff.current[idx].mute = true
                        socketRef.current.emit("updateRef", peersReff.current)
                    }
                }
            })
    
            socketRef.current.on("unmute", data=>{
                if (data.roomID === roomID){
                    const idx = peersReff.current.findIndex(p => p.peerID === data.id);
                    if(idx > -1){
                        peersReff.current[idx].mute = false
                        socketRef.current.emit("updateRef", peersReff.current)
                    }
                }
            })
    
            socketRef.current.on("draw", data=>{
                if (data.roomID === roomID){
                    // setDrawerCounter(drawerCounter=>drawerCounter+1)
                    drawerCounter.current += 1
                    onCountDown()
                    setDrawWord(data.word)
                }
            })
    
            socketRef.current.on("skip", roomid=>{
                if (roomid === roomID){
                    drawerCounter.current += 1
                    // setDrawerCounter(drawerCounter=>drawerCounter+1)
                }
            })
            
            socketRef.current.on("add answer replied", obj => {
                if (obj.roomID === roomID) {
                    // console.log(roomID)
                    // console.log(obj.answer)
                    setAnswerData(answerData=>[...answerData, obj.answer])
                }
            });
    
            socketRef.current.on("welcome", obj => {
                if (obj.roomID === roomID) {
                    setAnswerData(answerData=>[...answerData,obj.user])
                }
            });
    
            socketRef.current.on("not ready", data => {
                if (data.roomID === roomID) {
                    setDrawModal(false)
                    setCanvasOn(false)
                    setStart(false)
                    setTimeout(() => {
                        alert('Waiting for all players to play again..')
                    }, 500);
                }
            });
    
            socketRef.current.on("all users", (obj) => {
                if (obj.roomID === roomID) {
                    setUsers(users=>obj.usersInThisRoom) 
    
                    userSnapshot.current = obj.userSnapshot
                    // setUserSnapshot(userSnapshot=>obj.userSnapshot) 
    
                    setIsReady(true)
                }
            });
    
            socketRef.current.once("room started", (obj) => {
                history.replace("/")
                errorSound.play()
                alert('The room has started! please come back later or create a new one.')
            });
    
            socketRef.current.once("room full", (obj) => {
                history.replace("/")
                errorSound.play()
                alert('The room is full (max 6 players), please create a new one.')
            });
    
            socketRef.current.on("canvas-data", data =>{
                if (data.room === roomID) {
                    var image = new Image()
                    // const canvas =  canvasRef.current;
                    const context = contextRef.current
    
                    image.onload= function(){
    
                        var cheight = (window.innerHeight - 50) *0.5
                        var cwidth = (window.innerWidth - 320) * 0.85 * 0.9
    
                        context.canvas.width = cwidth*2 ;
                        context.canvas.height = cheight*2 ;
    
                        context.scale(2,2)
                        context.drawImage(image,0,0, cwidth, cheight)
                        context.lineWidth = lineWidth
                        context.strokeStyle = color
                        context.lineCap = "round"
                    }
                    image.src = data.data;  
                }
            })
    
            socketRef.current.on("disconnected", (obj) => {
                if (obj.roomID === roomID && obj.userdisconnect[0].user) {
                    
                    var udisconnect = obj.userdisconnect[0].user
                    var userDis = {
                        userid: udisconnect.userid,
                        username: udisconnect.username,
                        profile : udisconnect.profile,
                        status :3 
                    }
    
                    if(peersReff.current.length!== 0){
                        const idx = peersReff.current.findIndex(p => p.peerID === obj.userdisconnect[0].id);
                        // console.log(peersReff.current)
                        // if (peersReff.current[idx]) {peersReff.current[idx].peer.destroy()}        
                        if (idx > -1) {
                            peersReff.current.splice(idx, 1);
                        }
                        setPeers(peersReff.current)
                        resizeVideo()
                    }
                    
                    // var userList = obj.usersInThisRoom.filter(e => e.id !== socketRef.current.id);
                    // alert(JSON.stringify(userList))
    
                    // const peersList = [];
                    // const peersRefList = [];
                    // userList.forEach(user=>{
                    //     const peer = createPeer(user.id, socketRef.current.id, window.localStream);
                    //     peersRefList.push({
                    //         peerID: user.id,
                    //         peer,
                    //     })
                    //     peersList.push({
                    //         peerID: user.id,
                    //         peer: peer,
                    //     });        
                    // })
    
                    // peersRef.current = peersRefList
                    // setPeers(peersList) 
    
                    
                    // var idx = peersRef.current.findIndex((obj)=>obj.peerID === obj.userdisconnect[0].id)
                   
                    // peersRef.current[idx].peer.destroy()
                    userSnapshot.current = obj.snapShots
    
                    // setUserSnapshot(userSnapshot=>obj.snapShots)
                    
                    setUsers(users=>obj.usersInThisRoom)
                    setAnswerData(answerData=>[...answerData,userDis])
                }
            });
        })
    } else {
        history.replace(`/enter/${roomID}`);
    }
    },[])

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator : true,
            trickle: false,
            reconnectTimer: 100,
            stream,
        })

        peer.on("signal", signal =>{
            socketRef.current.emit("sending signal", {userToSignal, callerID, signal})
        })

        peer.on('error', (err) => {
            peer.destroy()
        })

        peer.on('close', () => {
            peer.destroy()
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator : false,
            trickle:false,
            reconnectTimer: 100,
            stream,
        })

        peer.on("signal", signal=>{
            socketRef.current.emit("returning signal", {signal, callerID})
        })

        peer.on('error', (err) => {
            peer.destroy()
        })

        peer.on('close', () => {
            peer.destroy()
        })

        peer.signal(incomingSignal);
        return peer;
    }

    //================================================
    
    //========== Handling send answer ===============
    const sendAnswer = async (event)=>{
        event.preventDefault();
    
        if (/\S/.test(answer) ){  
            var ansObj
            if (answer === drawWord && drawingOngoing && drawerRef.current.id !== socketRef.current.id){  
                //adding point
                addPoint()
                setDrawingOngoing(false)
                ansObj = {
                    userid: USERID,
                    username: userName,
                    answer:  answer,
                    profile: character,
                    status :  1 
                }

            } else {
                ansObj = {
                    userid: USERID,
                    username: userName,
                    answer:  answer,
                    profile: character,
                    status :  0 
                }
            }
             

            socketRef.current.emit("add answer", {roomID: roomID, answer: ansObj});
            setAnswer('')
        }
    }

    // countdown timer bar
    const [timerCount, setTimerCount] = useState(false)
    const timer = useRef(null);
    const top5 = useRef(null);
    const top2 = useRef(null);
    const dingRef = useRef(null);
    const showAnswerRef = useRef(null);


    //when state is drawing
    const onCountDown = ()=>{
        
        setTopPoint(20)
        setDrawingOngoing(true)
        setTimerCount(true)
        timer.current = setTimeout(() => {
            setTimerCount(false)
            setDrawingOngoing(false)
            onShowAnswer()
        }, 90000);

        top5.current = setTimeout(() => {
            setTopPoint(10)
        }, 45000);

        top2.current = setTimeout(() => {
            setTopPoint(5)
        }, 70000);

        dingRef.current= setTimeout(() => {
            if (playing){
                tickingSound.play()
            }   
        }, 82000);
    }


    //========drawing============
    const [isReady, setIsReady] = useState(false) // to check if users is retrieve successfully
    const [drawWord, setDrawWord] = useState('') // the word to draw
    const [drawModal, setDrawModal] = useState(false) // open up the choose word modal
    const [isStart, setStart] = useState(false) // to start the game
    const [canvasOn, setCanvasOn] = useState(false) // is canva on or off
    const [drawingOngoing, setDrawingOngoing] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const [showWin, setShowWin] = useState(false)
    const [topPoint, setTopPoint] = useState(20)

    const userSnapshot = useRef([])
    const drawerRef = useRef({})
    const drawerCounter = useRef(0)
    
    const onShowAnswer = ()=>{
        const context = contextRef.current

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        if(playing){
            answerSound.play()
        }
        
        setShowAnswer(true)
        setCanvasOn(false)
         
        showAnswerRef.current =  setTimeout(() => {
           setShowAnswer(false)
           setCanvasOn(true)


           if (drawerRef.current.id == socketRef.current.id){
                socketRef.current.emit('next drawer', {roomID: roomID, userSnapshot : userSnapshot.current, counter: drawerCounter.current})
           } 
        }, 6000);
    }

    const onRandom = ()=>{
        const slug = generateSlug(1, {
            format: "lower",
            partsOfSpeech: ["noun"],
            categories: {
              noun: ["animals", "people", "family", "education", "religion", "business", "thing","transportation", "technology","place", "profession", "media", "health", "food", "sports", "science"]
            },
          });
          setDrawWord(slug)
    }

    const onSkip = () =>{
        minusPoint()
        var temp = drawerCounter.current

        if(temp === 0){
            temp = 1
        }

        // setDrawerCounter(drawerCounter=>drawerCounter+1)
        drawerCounter.current += 1

        setDrawModal(false)
        socketRef.current.emit("skip", roomID)
        socketRef.current.emit('next drawer', {roomID: roomID, userSnapshot : userSnapshot.current, counter: temp})
    }

    const onDraw = () =>{
        if(drawWord!== ''){
            setDrawingOngoing(true)
            // setDrawerCounter(drawerCounter=>drawerCounter+1)
            drawerCounter.current += 1
            socketRef.current.emit('draw', {roomID: roomID, word:drawWord})
            setDrawModal(false)
            onCountDown()
        } else {
            errorSound.play()
            alert('Please choose word to draw')
        }
        
    }

    const addPoint = ()=>{
        var userArr = users
        var idx = userArr.findIndex(x => x.id === socketRef.current.id);
        users[idx].user.points = users[idx].user.points + topPoint
        var temp = [...users]
        temp.sort((a, b) => (a.user.points < b.user.points) ? 1 : -1)
        setUsers([...temp])

        if (temp[0].id === socketRef.current.id){
            setJumpButton(true)
        }
        else {
            setJumpButton(false)
        }

        if (playing){
            dingSound.play()
        }
       

        socketRef.current.emit("add point", {roomID: roomID, user: temp , id: socketRef.current.id});
    }

    const minusPoint = ()=>{
        var userArr = users
        var idx = userArr.findIndex(x => x.id === socketRef.current.id);
        users[idx].user.points = users[idx].user.points - 10
        var temp = [...users]
        temp.sort((a, b) => (a.user.points < b.user.points) ? 1 : -1)
        setUsers([...temp])

        if (temp[0].id === socketRef.current.id){
            setJumpButton(true)
        } else {
            setJumpButton(false)
        }

        socketRef.current.emit("minus point", {roomID: roomID, user: temp});
    }

    const onStart = ()=>{
        socketRef.current.emit("start", {user : users[0], roomID : roomID})
        setDrawWord('')
        setDrawModal(true)
        // setDrawer(users[0])
        drawerRef.current = users[0]
        setCanvasOn(true)
        setStart(true)
    }

    const onAllAnswer = () =>{
        clearInterval(timer.current)
        clearInterval(dingRef.current)
        clearInterval(top5.current)
        clearInterval(top2.current)
        setTimerCount(false)
        setDrawingOngoing(false)
        onShowAnswer()       
    }

    const onGameOver = (user)=>{
        if (playing){
            winSound1.play()
            winSound2.play()
        }
       
        setTimeout(() => {
            setDrawModal(false)
            clearInterval(showAnswerRef.current)
        }, 500);
        setDrawingOngoing(false)
        clearInterval(timer.current)
        clearInterval(dingRef.current)
        clearInterval(top5.current)
        clearInterval(top2.current)
        setCanvasOn(false)
        setShowWin(true)
        const canvas = canvasRef.current;
        const context = contextRef.current

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    const onPlayAgain = ()=>{
        setTimerCount(false)
        setStart(false)
        setCanvasOn(false)
        setShowWin(false)
        setShowAnswer(false)
        // setDrawerCounter(1)
        drawerCounter.current = 1
        setDrawWord('')
        setDrawModal(false)
        socketRef.current.emit("playagain", {roomID: roomID, id: socketRef.current.id})
    }

    const onHandleDrawWord = (val)=>{
        var temp = val.replace(/\s*/g,"")
        setDrawWord(temp.toLowerCase())
    }

    const [toolChildSize, setToolChildSize] = useState(20)
    const [firstClick, setFirstClick] = useState(true)
    const [ mute, setMute] = useState(false)

    const onPauseSound = ()=>{
        setPlaying(false)
    }

    const onUnmute = ()=>{
        setMute(false)
        window.localStream.getAudioTracks()[0].enabled = true
        socketRef.current.emit('unmute',{roomID: roomID, id: socketRef.current.id})
    }

    const onMute = ()=>{
        setMute(true)
        window.localStream.getAudioTracks()[0].enabled = false
        socketRef.current.emit('mute',{roomID: roomID, id: socketRef.current.id})
    }

    const [videoStarted, setVideoStarted] = useState(true)

    const onStartVideo = ()=>{
        setVideoStarted(true)
        window.localStream.getVideoTracks()[0].enabled = true
    }

    const onStopVideo = ()=>{
        setVideoStarted(false)
        window.localStream.getVideoTracks()[0].enabled = false
    }

    // ================== Onboarding ===================
    const [onboardVisible ,setOnboard ] = useState(true)

    const onboardExit = ()=>{
        setOnboard(false)
        setJumpButton (false)
        window.localStream.getVideoTracks()[0].enabled = true
    }

      const stepsPrivate = [
        {
          element: '.halloween-logo',
          intro: `Welcome to the party ${String.fromCodePoint(0x1F47B) + "\n Here's how to play"}`,
          position: 'bottom',
         
        },
        {
          element: '.canvas',
          intro: `Everyone will have 90 sec to draw in turn ${String.fromCodePoint(0x1F58C)}, and the other need to guess it!`,
        },
        {
            element: '.point-section',
            intro: `If you guess it right, you can get up to +20 points.  ${"\n\n To win you must collect 100 points "+ String.fromCodePoint(0x1F3C6)}`,
            position: 'left',
        },
        {
            element: '.chat-section',
            intro: 'you can type the answer and all chats will appear here',
            position: 'left',
        },
        {
          element: '.ghost-button',
          intro: `Here's the fun! you can jumpscare your friend if you're on the first position ${String.fromCodePoint(0x1F47B)}`,
        },
        {
            element: '.invite-button',
            intro: `Let the fun begin ${String.fromCodePoint(0x1F383) +"\n Invite your friends by sending the link. (Max 6 players)"}`,
            
        },
      ];

      const stepsPublic = [
        {
          element: '.halloween-logo',
          intro: `Welcome to the party ${String.fromCodePoint(0x1F47B) + "\n Here's how to play"}`,
          position: 'bottom',
         
        },
        {
          element: '.canvas',
          intro: `Everyone will have 90 sec to draw in turn ${String.fromCodePoint(0x1F58C)}, and the other need to guess it!`,
        },
        {
            element: '.point-section',
            intro: `If you guess it right, you can get up to +20 points.  ${"\n\n To win you must collect 100 points "+ String.fromCodePoint(0x1F3C6)}`,
            position: 'left',
        },
        {
            element: '.chat-section',
            intro: 'you can type the answer and all chats will appear here',
            position: 'left',
        },
        {
          element: '.ghost-button',
          intro: `Here's the fun! you can jumpscare others if you're on the first position ${String.fromCodePoint(0x1F47B)}`,
        },
        {
            element: '.halloween-logo',
            intro: `Let the fun begin ${String.fromCodePoint(0x1F383)}`,
            
        },
      ];

    return(
        <div style={{width:'100vw', height:'100vh', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <div onClick={()=>{ if(firstClick) togglePlaying(); setFirstClick(false); }} className="main" style={{ width:'100%', height:'100%' , flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            {/* <audio loop
                ref={audioBg} 
                src={bgmusics} 
            ></audio> */}

                {/* left */}
                <div style={{ flex:1, width: `calc(100% - 320)`,  display:'flex',  flexDirection:'column',height:'100%'}}>
                    
                    {/* header */}
                    <div style={{backgroundColor: Constant.DARKER_GREY, width:'100%', minHeight:50, display:'flex', justifyContent:'space-between', alignItems:'center'}}>    
                        <img style={{objectFit:'contain', width:120, height:40,marginRight:10, marginLeft:50}} src={limedrawlogo} alt="Logo" />
                        <img className="halloween-logo" style={{objectFit:'contain', width:200, height:40,marginRight:10, marginLeft:50}} src={halloweenparty} alt="Logo" />
                        <div className="logout-button" onClick={logout} style={{ height:'100%', display:'flex', alignItems:'center'}}>
                            <IoMdLogOut size={25} style={{marginRight:20}}/>
                        </div>
                    </div>

                    {/* main content */}
                    <div style={{flex:1, width:'100%', display:'flex', flexDirection:'column'}}>
                        {/* top */}
                        <div className="canvas-tools"  style={{ display: 'flex', flexDirection:'row', width:'100%', height: peers.length >=3 ?'55%' : '60%', paddingTop:'2%', paddingBottom:'2%'}}>

                            {/* Tools panel */}
                            <div style={{ height:'100%', width:'15%', display:'flex', flexDirection:'column',  justifyContent:'center', alignItems:'center'}}>
                            <div style={{ backgroundColor:'rgba(105,105,105,0.7)', height:'80%', backgroundBlendMode:'luminosity',  borderRadius:5}}>
                                
                                {/* pencil eraser */}
                                <div style={{display:'flex', flexDirection:'row', padding:5, borderBottom:"2px solid #414141"}}>
                                   <div onClick={()=>{changeTool('pencil')}} style={{backgroundColor: tool==='pencil'? '#b0b0b0' : 'rgba(0,0,0,0)',margin:2, display:'flex', width:toolChildSize, height:toolChildSize, borderRadius:5, border:"1px solid #C2C2C2", justifyContent:'center', alignItems:'center'}}>
                                        <RiPencilFill size={toolChildSize-11} color={tool==='pencil'? 'white' : "#C2C2C2"}/>
                                   </div>

                                   <div onClick={()=>{changeTool('eraser')}} style={{backgroundColor: tool==='eraser'? '#b0b0b0' : 'rgba(0,0,0,0)', margin:2, display:'flex', width:toolChildSize, height:toolChildSize, borderRadius:5, border:"1px solid #C2C2C2", justifyContent:'center', alignItems:'center'}}>
                                        <BsEraserFill size={toolChildSize-13}  color={tool==='eraser'? 'white' : "#C2C2C2"}/>
                                   </div>
                                </div>

                                {/* border radius */}
                                <div style={{display:'flex', flexDirection:'row', padding:5, borderBottom:"2px solid #414141"}}>
                                   <div onClick={()=>{setLineWidth(4); changelineWidth(4)}} style={{backgroundColor: lineWidth===4? '#b0b0b0' : 'rgba(0,0,0,0)',  margin:2, display:'flex', width:toolChildSize, height:toolChildSize, borderRadius:100, border:"1px solid #C2C2C2", justifyContent:'center', alignItems:'center'}}>
                                        <div style={{width:5, height:5, backgroundColor: lineWidth===4? 'white':'#C2C2C2', borderRadius:100}}/>
                                   </div>

                                   <div onClick={()=>{setLineWidth(7); changelineWidth(7)}} style={{backgroundColor: lineWidth===7? '#b0b0b0' : 'rgba(0,0,0,0)', margin:2, display:'flex', width:toolChildSize, height:toolChildSize, borderRadius:100, border:"1px solid #C2C2C2", justifyContent:'center', alignItems:'center'}}>
                                        <div style={{width:10, height:10, backgroundColor:lineWidth===7? 'white':'#C2C2C2', borderRadius:100}}/>
                                   </div>
                                </div>

                                {/* Color */}
                                {/* #1 */}
                                <div style={{display:'flex', flexDirection:'row', paddingTop:5, paddingLeft:5, paddingRight:5}}>
                                   <div onClick={()=>{setColor('black'); changeColor('black')}} style={{backgroundColor:'black', border: color ==='black'? '2px solid white' : '0px', margin:3, display:'flex', width:color ==='black'? toolChildSize-4 : toolChildSize, height:color ==='black'? toolChildSize-4 : toolChildSize, borderRadius:5}}/>
                                   <div onClick={()=>{setColor('white'); changeColor('white')}} style={{backgroundColor:'white', border: color ==='white'? '2px solid white' : '0px', margin:3, display:'flex', width:color ==='white'? toolChildSize-4 : toolChildSize, height:color ==='white'? toolChildSize-4 : toolChildSize, borderRadius:5}}/>
                                </div>

                                {/* #2 */}
                                <div style={{display:'flex', flexDirection:'row', paddingLeft:5, paddingRight:5}}>
                                   <div onClick={()=>{setColor('grey'); changeColor('grey')}} style={{backgroundColor:'grey', border: color ==='grey'? '2px solid white' : '0px', margin:3, display:'flex', width: color ==='grey'? toolChildSize-4 : toolChildSize, height: color ==='grey'? toolChildSize-4 : toolChildSize, borderRadius:5}}/>
                                   <div onClick={()=>{setColor('lightgrey'); changeColor('lightgrey')}} style={{backgroundColor:'lightgrey',border: color ==='lightgrey'? '2px solid white' : '0px', margin:3, display:'flex', width:color ==='lightgrey'? toolChildSize-4 : toolChildSize, height:color ==='lightgrey'? toolChildSize-4 : toolChildSize, borderRadius:5}}/>
                                </div>

                                {/* #3 */}
                                <div style={{display:'flex', flexDirection:'row', paddingLeft:5, paddingRight:5}}>
                                   <div onClick={()=>{setColor('blue'); changeColor('blue')}} style={{backgroundColor:'blue', border: color ==='blue'? '2px solid white' : '0px',margin:3, display:'flex', width:color ==='blue'? toolChildSize-4 : toolChildSize, height:color ==='blue'? toolChildSize-4 : toolChildSize, borderRadius:5}}/>
                                   <div onClick={()=>{setColor('red'); changeColor('red')}} style={{backgroundColor:'red', border: color ==='red'? '2px solid white' : '0px',margin:3, display:'flex', width:color ==='red'? toolChildSize-4 : toolChildSize, height:color ==='red'? toolChildSize-4 : toolChildSize, borderRadius:5}}/>
                                </div>

                                {/* #4 */}
                                <div style={{display:'flex', flexDirection:'row', paddingLeft:5, paddingRight:5}}>
                                   <div onClick={()=>{setColor('yellow'); changeColor('yellow')}} style={{backgroundColor:'yellow', border: color ==='yellow'? '2px solid white' : '0px',margin:3, display:'flex', width:color ==='yellow'? toolChildSize-4 : toolChildSize, height:color ==='yellow'? toolChildSize-4 : toolChildSize, borderRadius:5}}/>
                                   <div onClick={()=>{setColor('#52FF00'); changeColor('#52FF00')}} style={{backgroundColor:'#52FF00', border: color ==='#52FF00'? '2px solid white' : '0px',margin:3, display:'flex', width:color ==='#52FF00'? toolChildSize-4 : toolChildSize, height:color ==='#52FF00'? toolChildSize-4 : toolChildSize, borderRadius:5}}/>
                                </div>

                                {/* #5 */}
                                <div style={{display:'flex', flexDirection:'row', paddingLeft:5, paddingRight:5, paddingBottom:5}}>
                                   <div onClick={()=>{setColor('#FF00B8'); changeColor('#FF00B8')}} style={{backgroundColor:'#FF00B8',border: color ==='#FF00B8'? '2px solid white' : '0px', margin:3, display:'flex', width:color ==='#FF00B8'? toolChildSize-4 : toolChildSize, height:color ==='#FF00B8'? toolChildSize-4 : toolChildSize, borderRadius:5}}/>
                                   <div onClick={()=>{setColor('brown'); changeColor('brown')}} style={{backgroundColor:'brown', border: color ==='brown'? '2px solid white' : '0px',margin:3, display:'flex', width:color ==='brown'? toolChildSize-4 : toolChildSize, height:color ==='brown'? toolChildSize-4 : toolChildSize, borderRadius:5}}/>
                                </div>

                            </div>

                            {jumpButton &&
                            <div onClick={()=>{onJump()}} className="ghost-button" style={{display:'flex' ,width:toolChildSize*2+20, height:'15%', marginTop:'5%', borderRadius: 5, justifyContent:'center', alignItems:'center'}}>
                                <SiGhostery size={toolChildSize-5} />
                            </div>
                            }

                            </div>

                            <div style={{ width: '85%'}}>
                                {/* Canvas */}
                                <div className={"canvas"} style={{ borderRadius:15, width:'90%'}}> 

                                    <canvas
                                        style={{display: canvasOn? 'flex' : 'none', cursor: socketRef.current && drawerRef.current.id === socketRef.current.id ?'crossHair' : 'not-allowed'}}
                                        onMouseDown = {socketRef.current && drawerRef.current.id === socketRef.current.id? startDrawing : null}
                                        onMouseUp = {socketRef.current && drawerRef.current.id === socketRef.current.id? finishDrawing: null}
                                        onMouseMove = {socketRef.current && drawerRef.current.id === socketRef.current.id? draw : null}
                                        onMouseLeave ={()=>{ if (isDrawing)finishDrawing()}}
                                        // onTouchStart = {drawerRef.current.id === socketRef.current.id? startDrawing : null}
                                        // onTouchEnd = {drawerRef.current.id === socketRef.current.id? finishDrawing: null}
                                        // onTouchMove = {drawerRef.current.id === socketRef.current.id? draw : null}
                                        // onTouchCancel = {()=>{ if (isDrawing)finishDrawing()}}
                                        ref = {canvasRef}
                                    /> 
                                    

                                    {/* canvas place for other stuffs */}
                                    
                                    <div ref={canvasPlace} style={{display: canvasOn?'none':'flex',  borderRadius:15}}>
                                        {isReady && users.length > 1 &&  !showWin?
                                        
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%'}}>

                                            {!isStart && users[0].id === socketRef.current.id ?
                                           
                                           <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                                                <span style={{fontWeight:'bold', fontSize:20, marginBottom:20}} >Start the party and have fun screaming!</span>
                                                <div onClick={onStart} className="draw-button" style={{display:'flex', borderRadius:10,justifyContent:'center', alignItems:'center', marginLeft:20, color:'white', fontWeight:'bold'}}>
                                                    <FaPlay/> <span style={{fontWeight:'bold', marginLeft:10}}>START</span>
                                                </div>
                                            </div> 
                                            
                                            :
                                           
                                           <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                                                
                                                {showAnswer?
                                                 <span style={{fontWeight:'bold', fontSize:25, marginBottom:20, color:Constant.PRIMARY_COLOR}} >The Answer is <span style={{color:'orange'}}>{drawWord}</span></span>
                                               
                                                 : 
                                                
                                                <span style={{fontWeight:'bold', fontSize:20, marginBottom:20, color:Constant.PRIMARY_COLOR}} >Waiting for {users[0].user.username} to start the party...</span>
                                                }
                                            </div> 
                                            }
                                        </div> 
                                        
                                        :                       
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', width:'100%', height:'100%'}}>
                                            {showWin ?
                                                <div style={{ display:'flex', width:'100%', height:'100%', flexDirection:'column',alignItems:'center', justifyContent:'space-between',  backgroundImage: 'linear-gradient(#DF00A1, #E47487)', borderRadius:15}}>
                                                    <div style={{ display:'flex', width:'90%', height:'75%', justifyContent:'center', paddingTop:20, alignItems:'flex-end'}}>
                                                        { users.map((eachUser,idx)=>{
                                                            return (
                                                                <div style={{display:'flex',marginLeft:'2%' ,justifyContent:'flex-end', marginRight:'2%', width:`calc(100% / ${users.length})`, height:'100%',flexDirection: 'column'}}>
                                                                    <img style={{width:'100%', height:'40%', objectFit:'contain', alignSelf:'flex-end'}} 
                                                                    src ={ eachUser.user.profilenobg} 
                                                                    alt={"user"}/>

                                                                    <div style={{paddingTop:10, borderTopLeftRadius:5, borderTopRightRadius:5, alignItems:'center', justifyContent:'center', paddingBottom:10, display:'flex',backgroundColor: idx===0? 'orange' : 'rgba(255,255,255,0.3)', width:'100%', height:`calc(55% * ${eachUser.user.points} * 0.01 + 20px)`, flexDirection: 'column', color:'white'}}>
                                                                        <span style={{fontWeight:'bold'}}>{eachUser.user.points}</span>
                                                                        <span style={{fontSize: idx ===0? 14: 12, fontWeight: idx === 0 ? 'bold': 'normal'}}>{eachUser.user.username}</span>
                                                                        
                                                                        {idx === 0 && <AiFillTrophy color="yellow" size={25} style={{marginTop:10}}/>}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        
                                                        }
                                                        
                                                    </div>
                                                    <div style={{height:'25%', cursor:'pointer', justifyContent:'center', alignItems:'center', display:'flex'}}>
                                                        <div className='play-button' onClick={onPlayAgain} style={{color:'white', borderRadius:10,  padding:10, justifyContent:'center', alignItems:'center', display:'flex'}}>
                                                            <FaPlay/> 
                                                            <span style={{marginLeft:10, fontWeight:'bold'}}>Play Again</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <span style={{fontWeight:'bold', fontSize:20, marginBottom:20, color:Constant.PRIMARY_COLOR}} >{roomType == "public" ? "Waiting for people to join the room...": "Waiting for friends to join the room..."}</span>
                                            } 
                                         </div>

                                        }


                                    </div>
                                    
                                    
                                </div>
                               
                                <div style={{backgroundColor:"#FFCEF1", display:canvasOn? 'flex' : 'none', width:'86%', marginLeft:'2%', marginRight:'2%',  position:'relative', top:-20, borderRadius:100, }}>
                                    <div className={timerCount? "timer-bar count":"timer-bar" } style={{ height:10,borderRadius:100 }}/>
                                </div>
                            </div>
                        </div>


                        {/* bottom */}
                        <div style={{ height: peers.length >=3 ?'45%' : '40%', display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
                            <div style={{ position:'relative',marginLeft:10, marginRight:10, marginBottom: 5, height: videoHeight, width: videoWidth }}> 
                                <video id="videoElement" style={{backgroundColor:'#444',  border:socketRef.current && drawerRef.current.id === socketRef.current.id ?'4px solid #CD0094': '0px',borderRadius:10, justifyContent:'center',  height: videoHeight, width: videoWidth , objectFit: "cover" }} ref={userVideo} autoPlay playsInline/> 
                                <div style={{ color:'white', position:'absolute',  bottom:'3%', left:'5%', backgroundColor:'rgba(0,0,0,0.4)', paddingTop:2, paddingBottom:2, paddingLeft:5, paddingRight:5, borderRadius:3}}>
                                    {mute && <BsFillMicMuteFill color="#FF4A4A" size={15}/>}

                                    {myself.username}
                                </div>
                            </div>


                           {peers.map((peer,index)=>{
                               return <Video key={peer.peerID} peer={peer} scare={scare} drawer={drawerRef.current.id} height={videoHeight} width={videoWidth}/>
                           })}                        
                            


                        </div>
                    </div>
                </div>
                
                {/* right */}
                <div style={{backgroundColor:Constant.DARKER_GREY, width: 320, height:'100%', borderLeft: "1px solid #2B2B2B"}}>

                    {/* POINTS */}
                    <div  className="point-section" style={{ height: `calc(100% *0.5)`, width:'100%'}}>

                        {/* header */}
                        <div style={{backgroundColor:Constant.LIGHTER_GREY, height: '40px', paddingRight:16, paddingLeft:16, display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <span style={{color:"white", fontWeight:'bold' ,fontSize:14}}>Points</span>
                            {roomType === 'private' && 
                            <div className="invite-button" onClick={invite} style={{cursor:'pointer', color:'white', padding:5, borderRadius:5, fontSize:13, fontWeight:'bold'}}>
                                + Invite friends
                            </div>
                            }
                        </div>

                        {/* content */}
                        <div style={{display:'flex', backgroundColor: Constant.DARKER_GREY, flexDirection:'column', overflowY:'scroll', height: `calc(100% - 50px)`, paddingLeft:10, paddingRight:5, paddingTop:5, paddingBottom:5 }}>
                            {users.map((e, index)=>{
                                return <RenderPoints item={e} socketid={socketRef.current.id} idx={index} key={index}/>
                            })}
                        </div>
                    </div>

                    {/* ANSWER */}
                    <div className={'chat-section'} style={{ height: `calc(100% *0.5)`, width:'100%', display:'flex',  flexDirection:'column'}}>

                        {/* header */}
                        <div style={{backgroundColor:Constant.LIGHTER_GREY,  display:'flex', minHeight:'40px', flexDirection:'row', justifyContent:'flex-start', paddingLeft:16, alignItems:'center'}}>
                            <span style={{color:"white", fontWeight:'bold',fontSize:14}}>Answers</span>
                        </div>

                        <div className="chat-box" style={{flex:1}}>
                            {[...answerData].reverse().map((e, index)=>{
                                return <RenderBubbles item={e} key={index}/>
                            })}
                        </div>

                        {/* Input */}
                        <form onSubmit={sendAnswer} style={{display:'flex', flexDirection:'row'}}> 
                            <input
                                onChange={(val)=>{
                                    setAnswer(val.target.value)
                                }}
                                name='message' 
                                className='input-message' 
                                placeholder='Type answer here...' 
                                value={answer}
                            />
                        </form>                        
                    </div>
                </div> 
                
                {/* invite modal */}
                <div  style={{position:'absolute', width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.4)', display: isInvite ?'flex': 'none', justifyContent:'center', alignItems:'center'}}>
                    <div style={{backgroundColor:'white', maxWidth:'40%',display:'flex', flexDirection:'column', alignItems:'center', padding:16, borderRadius:20}}>
                        <div onClick={()=>{setInvite(false)}} style={{display:'flex', width:'100%',flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}> 
                            <AiOutlineClose size={20} color="white"/>
                            <AiOutlineClose size={20} color="black" />
                        </div>
                        <img style={{width:'40%', height:'auto'}} src ={nenek} alt={"invite picture"}/>
                        <span style={{fontWeight:'bold', fontSize:18, color: Constant.PRIMARY_COLOR, marginBottom:16}}>Link Copied!</span>  
                        <span style={{border:'1px solid lightgrey', color:'grey', borderRadius:10, fontSize:14, padding:10}}>{"https://limedraw.io/enter/"+roomID}</span>
                        <span style={{color: 'black',fontWeight:'bold',fontSize:18, marginTop:20, marginBottom:20}}>Send to your friends and start scaring them!</span>
                    </div> 
                </div>


                {/* choose word */}
                {drawModal &&
                <div style={{position:'absolute', width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.4)', display: 'flex', justifyContent:'center', alignItems:'center'}}>
                    <div style={{backgroundColor:'white',width:'30%',display:'flex', flexDirection:'column', alignItems:'center', padding:20, borderRadius:20}}>
                        <span style={{fontSize:20, fontWeight:'bold', color: Constant.PRIMARY_COLOR}}>IT'S YOUR TURN!</span>
                                
                        <div style={{ width:'100%', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', margin:20}}>
                            <input
                                onFocus={()=>{
                                    setDrawWord('')
                                }}
                                onChange={(val)=>{
                                    onHandleDrawWord(val.target.value)
                                }}
                                name='message' 
                                className='input-draw' 
                                placeholder='Choose a word to draw...' 
                                value={drawWord}
                            />
                            <div onClick={onRandom} className="random-button" style={{padding:10, borderRadius:10, marginLeft:20, color:'white', fontWeight:'bold'}}>
                                Random
                            </div>
                        </div>

                        <div style={{display:'flex', width:'100%',justifyContent:'center',  marginTop:50,flexDirection:'row'}}>
                            <div onClick={onSkip} className="skip-button" style={{ borderRadius:10, marginLeft:20, color:'white', fontWeight:'bold'}}>
                                Skip
                            </div>

                            <div onClick={onDraw} className="draw-button" style={{display:'flex', borderRadius:10,justifyContent:'center', alignItems:'center', marginLeft:20, color:'white', fontWeight:'bold'}}>
                               <RiPencilFill size={20} style={{marginRight:10}}/> <span>Draw</span>
                            </div>
                        </div>
                        

                    </div> 
                </div>
                }

               
                {/* Background music button */}
                {playing ? 
                <div style={{position:'absolute', bottom:20, left:20, display:'flex', flexDirection:'row', alignItems:'center'}}>         
                <div onClick={()=>{onPauseSound()}} className="soundeffect-button" style={{borderRadius:5,  width:35, height:35, display:'flex', justifyContent:'center', alignItems:'center', }}>
                    <IoMdVolumeHigh size={25} color="white"/>
                </div>
                <div className="soundeffect-label" style={{backgroundColor: Constant.LIGHTER_GREY, marginLeft:10, borderRadius:5, paddingTop:3, paddingBottom:3, paddingLeft:10, paddingRight:10, color:'lightgrey', fontSize:14}}>
                        Sound Effect On
                </div>
                </div>
                :
                <div style={{position:'absolute', bottom:20, left:20, display:'flex', flexDirection:'row', alignItems:'center'}}> 
                <div onClick={()=>{setPlaying(true)}} className="soundeffect-button" style={{borderRadius:5,  width:35, height:35, display:'flex', justifyContent:'center', alignItems:'center', }}>
                    <IoMdVolumeOff size={25} color="#FF4A4A"/>
                </div>
                <div className="soundeffect-label" style={{backgroundColor: Constant.LIGHTER_GREY, marginLeft:10, borderRadius:5, paddingTop:3, paddingBottom:3, paddingLeft:10, paddingRight:10, color:'lightgrey', fontSize:14}}>
                    Sound Effect Off
                </div>
                </div>
                }

                {/* mic button */}
                {mute?
                <div style={{position:'absolute', bottom:65, left:20, display:'flex', flexDirection:'row', alignItems:'center'}}>         
                    <div onClick={()=>{onUnmute()}} className="mic-button" style={{borderRadius:5,  width:35, height:35, display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <BsFillMicMuteFill size={20} color="#FF4A4A"/>
                    </div>
                    <div className="mic-label" style={{backgroundColor: Constant.LIGHTER_GREY, marginLeft:10, borderRadius:5, paddingTop:3, paddingBottom:3, paddingLeft:10, paddingRight:10, color:'lightgrey', fontSize:14}}>
                        Unmute
                    </div>
                </div>
                :
                <div style={{position:'absolute', bottom:65, left:20, display:'flex', flexDirection:'row', alignItems:'center'}}>         

                    <div onClick={()=>{onMute()}} className="mic-button" style={{borderRadius:5,  width:35, height:35, display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <BsFillMicFill size={20} color="white"/>
                    </div>
                    <div className="mic-label" style={{backgroundColor: Constant.LIGHTER_GREY, marginLeft:10, borderRadius:5, paddingTop:3, paddingBottom:3, paddingLeft:10, paddingRight:10, color:'lightgrey', fontSize:14}}>
                        Mute
                    </div>
                </div>
                }

                {/* start button */}
                {videoStarted?
                <div style={{position:'absolute', bottom:110, left:20, display:'flex', flexDirection:'row', alignItems:'center'}}>         
                    <div onClick={()=>{onStopVideo()}} className="video-button" style={{borderRadius:5,  width:35, height:35, display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <BsCameraVideoFill size={18} color="white"/>
                    </div>
                    <div className="video-label" style={{backgroundColor: Constant.LIGHTER_GREY, marginLeft:10, borderRadius:5, paddingTop:3, paddingBottom:3, paddingLeft:10, paddingRight:10, color:'lightgrey', fontSize:14}}>
                        Stop Video
                    </div>
                </div>
                :
                <div style={{position:'absolute', bottom:110, left:20, display:'flex', flexDirection:'row', alignItems:'center'}}>         

                    <div onClick={()=>{onStartVideo()}} className="video-button" style={{borderRadius:5,  width:35, height:35, display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <BsCameraVideoOffFill size={18} color="#FF4A4A"/>
                    </div>
                    <div className="video-label" style={{backgroundColor: Constant.LIGHTER_GREY, marginLeft:10, borderRadius:5, paddingTop:3, paddingBottom:3, paddingLeft:10, paddingRight:10, color:'lightgrey', fontSize:14}}>
                        Start Video
                    </div>
                </div>
                }
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

             {/* jumpscare */}
             <img src={ghost1}  style={{display:isjumpscare?'flex': 'none', objectFit:'cover' ,position:'absolute', width:'100%', height:'100%', backgroundColor:'white', borderRadius:15}}/>  
            {window.localStream &&
             <Steps
                exitOnOverlayClick={false}
                enabled={onboardVisible}
                steps={roomType === 'public'?  stepsPublic: stepsPrivate}
                initialStep={0}
                onExit={onboardExit}
                />
            }
        </div>
        
    );
}
export default Main;
