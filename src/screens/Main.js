import React, {useEffect, useState, useRef} from 'react'

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
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {FaPlay } from 'react-icons/fa'
import {IoMdVolumeHigh} from 'react-icons/io'
import {IoMdVolumeOff} from 'react-icons/io'

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
import {Howl} from 'howler';
import { v1 as uuid } from "uuid";
import { useHistory } from 'react-router';
import { useLocation} from "react-router-dom";
import { generateSlug } from "random-word-slugs";
// import Peer from 'peerjs';

//socket connection
const USERID = uuid();
// const socket = io.connect('https://limedraw.herokuapp.com/')
const socket = io.connect('http://109.106.255.226:5000')
// const socket = io.connect('http://localhost:5000')


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
const RenderPoints = ({item, idx})=>{
    const user = item.user

    return(
        <div style={{backgroundColor: item.id === socket.id ? Constant.LIGHTER_GREY : Constant.DARKER_GREY, display:'flex', alignItems:'center', justifyContent:'space-between', paddingRight:16, paddingLeft:10, borderRadius:5}}>
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
        
        props.peer.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })

        // props.peer.peer.on("close", stream => {
        //     props.peer.peer.removeStream(stream)
        // })
    }, []);


    // useEffect(()=>{
    //     props.peer.on('stream', userVideoStream =>{
    //         ref.current.srcObject = userVideoStream
            // ref.current.addEventListener('loadedmetadata',()=>{
            //     ref.current.play()
            // })
        // })
    
        // props.peer.on('close', ()=>{
        //     ref.current.remove()
        // })
    // },[])

return (
    <div style={{position:'relative',marginLeft:10, marginRight:10, marginBottom: 5, height: props.height, width: props.width }}>
        <video id="videoElement" style={{backgroundColor:'#444', border:props.drawer === props.peer.peerID ?'4px solid #CD0094': '0px', borderRadius:10,height: props.height, width: props.width , justifyContent:'center', objectFit:"cover"}}  ref={ref} autoPlay playsInline />
        <div style={{color:'white', position:'absolute',  bottom:'3%', left:'5%', backgroundColor:'rgba(0,0,0,0.4)', paddingTop:2, paddingBottom:2, paddingLeft:5, paddingRight:5, borderRadius:3, fontSize:14}}>
            {props.peer.username}
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
    const [answerData, setAnswerData] = useState([
        // {
        //     userid: '234',
        //     username: 'Ricky Pranaya',
        //     answer: 'Halloween',
        //     status :'0' 
        // }
    ])

    //peers users
    const [peers, setPeers] = useState([])
    const peersRef = useRef([])
    const [peersCall, setPeersCall] = useState({})
    const [users, setUsers] = useState([])

    //video webrtc
    const socketRef = useRef();
    const userVideo = useRef();
    const videoRef = useRef([])
    const roomID = props.match.params.roomID;
    const [userName, setUserName] = useState('')
    const [character, setCharacter] = useState('')

    //back button press
    let history = useHistory();
    let location = useLocation();
    const [isBackButtonClicked, setBackbuttonPress] = useState(false)

    //invite
    const [isInvite, setInvite] = useState(false)

    const invite = ()=>{
        setInvite(true)
        navigator.clipboard.writeText("https://limedrawio.herokuapp.com/enter/"+roomID)
    }

    //me 
    const [myself, setMyself] = useState({})


    useEffect(()=>{
        socket.on("jumpscare", roomId=>{
            if (roomId === roomID){
                jump()
            }
        })

        socket.on("all answer", roomId=>{
            if (roomId === roomID){
                onAllAnswer()
            }
        })

        socket.on("next drawer", data=>{
            if (data.roomID === roomID && data.userSnapshot.length !== 0){
                changeSound.play()
                var counter = drawerCounter.current
                var dividend = data.userSnapshot.length
                var index = counter % dividend
                // console.log("---------------")
                // console.log(counter)
                // console.log(data.userSnapshot)
                // console.log("index= "+ index)

                // setDrawer(drawer=> data.userSnapshot[index])
                drawerRef.current = data.userSnapshot[index]
        

                if (data.userSnapshot[index].id === socket.id){
                    setDrawWord('')
                    setDrawModal(true)
                    setCanvasOn(true)
                    setStart(true)
                }
            }
        })

        socket.on("add point", data=>{
            if (data.roomID === roomID){

                dingSound.play()
                if (data.user[0].id === socket.id){
                 setJumpButton(true)
                } else {
                 setJumpButton(false)
                }
                setUsers(data.user)
            }
        })

        socket.on("minus point", data=>{
            if (data.roomID === roomID){

                dingSound.play()
                if (data.user[0].id === socket.id){
                 setJumpButton(true)
                } else {
                 setJumpButton(false)
                }
                setUsers(data.user)
            }
        })

        socket.on("game over", data=>{
            if (data.roomID === roomID){
                onGameOver(data.user[0].user)
            }
        })

        socket.on("playagain", data=>{
            if (data.roomID === roomID){
                setUsers(data.snapshot)

                // setDrawer(data.snapshot[0])
                drawerRef.current = data.snapshot[0]
            }
        })

        socket.on("start", data=>{
            if (data.roomID === roomID){
                setStart(true)
                setCanvasOn(true)

                // setDrawer(data.user)
                drawerRef.current = data.user
            }
        })

        socket.on("draw", data=>{
            if (data.roomID === roomID){
                // setDrawerCounter(drawerCounter=>drawerCounter+1)
                drawerCounter.current += 1
                onCountDown()
                setDrawWord(data.word)
            }
        })

        socket.on("skip", roomid=>{
            if (roomid === roomID){
                drawerCounter.current += 1
                // setDrawerCounter(drawerCounter=>drawerCounter+1)
            }
        })
        
        socket.on("add answer replied", obj => {
            if (obj.roomID === roomID) {
                // console.log(roomID)
                // console.log(obj.answer)
                setAnswerData(answerData=>[...answerData, obj.answer])
            }
        });

        socket.on("welcome", obj => {
            if (obj.roomID === roomID) {
                setAnswerData(answerData=>[...answerData,obj.user])
            }
        });

        socket.on("not ready", data => {
            if (data.roomID === roomID) {
                setDrawModal(false)
                setCanvasOn(false)
                setStart(false)
                setTimeout(() => {
                    alert('Waiting for all players to play again..')
                }, 500);
            }
        });

        socket.on("all users", (obj) => {
            if (obj.roomID === roomID) {
                setUsers(users=>obj.usersInThisRoom) 

                userSnapshot.current = obj.userSnapshot
                // setUserSnapshot(userSnapshot=>obj.userSnapshot) 

                setIsReady(true)
            }
        });

        socket.on("canvas-data", data =>{
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

        socket.on("disconnected", (obj) => {
            
            
                
            if (obj.roomID === roomID) {
                
                var udisconnect = obj.userdisconnect[0].user
                var userDis = {
                    userid: udisconnect.userid,
                    username: udisconnect.username,
                    profile : udisconnect.profile,
                    status :3 
                }

                if(peersRef.current.length!== 0){
                    const idx = peersRef.current.findIndex(p => p.peerID === obj.userdisconnect[0].id);

                    peersRef.current[idx].peer.destroy()            
                    if (idx > -1) {
                        peersRef.current.splice(idx, 1);
                    }
                    setPeers(peersRef.current)
                    resizeVideo()
                }
                
                // var userList = obj.usersInThisRoom.filter(e => e.id !== socket.id);
                // alert(JSON.stringify(userList))

                // const peersList = [];
                // const peersRefList = [];
                // userList.forEach(user=>{
                //     const peer = createPeer(user.id, socket.id, window.localStream);
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
    },[])

    const logout = ()=>{
        errorSound.play()
        if (window.confirm("Do you wanna leave this room?")) {
            socket.close()
            // userVideo.current = null
            window.localStream.getTracks().forEach((track) => {
                track.stop();
            });

            history.replace("/")
          } else {
            window.history.pushState(null, null, window.location.pathname);
          }
    }

    useEffect(() => {

        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
    
        // //logic for showing popup warning on page refresh
        // window.onbeforeunload = function () {    
        //   return "Are you sure to leave this room?";
        // };
        // return () => {
        //   window.removeEventListener('popstate', onBackButtonEvent);
        // }
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      const onBackButtonEvent = (e) => {
        e.preventDefault();
        if (!isBackButtonClicked) {
            errorSound.play()
          if (window.confirm("Do you wanna leave this room?")) {
            setBackbuttonPress(true)
            socket.close()
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

    const updateDimensions = () => {
        const width = window.innerWidth
        const height = window.innerHeight


        resizeVideo();
        var size = peers.length >=3 ? (height - 140) *0.4 * 0.8/7 : (height - 140) *0.45 * 0.8/7
        setToolChildSize(size)
        // console.log(size)

        setWindowWidth(width)
        setWindowHeight(height)
    }


    const resizeVideo = ()=>{
        const width = (window.innerWidth - 320) * 0.4
        const height = peersRef.current.length >= 3 ? (window.innerHeight - 50) *0.45 *0.8 :  (window.innerHeight - 50) *0.4 *0.8

        if(peersRef.current.length <=1){
            setVideoWidth(width)
            setVideoHeight(height)
        } else if (peersRef.current.length === 2) {
            setVideoWidth(width * 0.7)
            setVideoHeight(height /1.2)
        } else if (peersRef.current.length >= 3){
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

    const startDrawing = ({nativeEvent})=>{
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const finishDrawing = ()=>{
        setIsDrawing(false)
        contextRef.current.closePath()

        var dataImg = canvasRef.current.toDataURL("image/png");
        socket.emit("canvas-data", {room: roomID, data: dataImg})

    }
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
    const changeColor = (clr)=>{

        if (tool !== 'eraser'){
            contextRef.current.strokeStyle = clr
        } else {
            setTool('pencil')
            contextRef.current.strokeStyle = clr
            contextRef.current.lineWidth = lineWidth
        }
    }

    const changelineWidth = (w)=>{
        if (tool !== 'eraser'){
            contextRef.current.lineWidth = w
        }
    }

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

    //========= jumpscare ========
    const [jumpButton, setJumpButton] = useState(false)
    const [isjumpscare, setIsjumpscare] = useState(false)
    var sound = new Howl({
        src: [sound1]
    });

    var tickingSound = new Howl({
        src: [ticking]
    });

    var dingSound = new Howl({
        src: [ding],
        volume:0.3
    });

    var answerSound = new Howl({
        src: [answerDing],
        volume:0.5
    });

    var winSound1 = new Howl({
        src: [winsound],
        volume:0.5
    });

    var winSound2 = new Howl({
        src: [shoutwin],
        volume:0.5
    });

    var changeSound = new Howl({
        src: [change],
        volume:0.5
    });

    var errorSound = new Howl({
        src: [errorsound]
    });
    
    

    const jump = ()=>{
        setIsjumpscare(true)
        sound.play()
        setTimeout(() => {
            setIsjumpscare(false)
        }, 3000);
        
        
    }

    const [scare, setScare] = useState(false)

    const onJump = ()=>{
        setJumpButton(false)
        socket.emit("jumpscare", roomID)
        setScare(true)
        setTimeout(() => {
            setScare(false)
        }, 3000);
    }
    //==============================================

    // background music
    const audioBg = useRef(null)
    const [playing, setPlaying] = useState(false);
    const togglePlaying = () => setPlaying((prev) => !prev);

    useEffect(() => {
        audioBg.current.volume = 0.04
        if (audioBg && audioBg.current) {
            if (playing) {
                audioBg.current.play();
            } else {
                audioBg.current.pause();
            }
        }
      }, [playing]);

    

    //================= video chat===================
    useEffect(()=>{
    if (location.state){

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
        setCharacter(image)

        

        var userJoin = {
            userid: USERID,
            username: location.state.nickname ,
            profile : image,
            profilenobg: imagenobg,
            points: 0,
            status :2 
        }

        setMyself({id: socket.id, username: location.state.nickname})
        
        //=========== peer js start ==========
        // const myPeer = new Peer(socket.id,{
        //     host: '/',
        //     port: '3030'
        // }); 

        // myPeer.on('open', id=>{
            // socket.emit("join room", {roomID: roomID, user: userJoin, peerID: id});
        // })
        //============ peer js end =============
        

        userVideo.current.muted=true

        function addVideoStream(video, stream) {
            video.srcObject = stream
            video.addEventListener('loadedmetadata',()=>{
                video.play()
            })
        }

        // function connectToNewUser (userId, stream){
        //     const call = myPeer.call(userId, stream)
        //     setPeers([...peers, call])
        //     peersCall[userId] = call
        //     setPeersCall(peersCall)

        // }
    
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

                // socket.on('user-connected', data=>{
                //     if (data.roomID === roomID){
                        
                //         connectToNewUser(data.user, stream)
                //     }
                // })

            //================= peer js end ====================

            // attach this stream to window object so you can reuse it later
            window.localStream = stream;
            
            socket.emit("join room", {roomID: roomID, user: userJoin});

            socket.on("peers", data=>{
                if (data.roomID === roomID) {
                    const peersList = [];
                    const peersRefList = [];
                    var contactlist = data.user.filter(obj => obj.id !== socket.id);
                    contactlist.forEach(user=>{
                        const peer = createPeer(user.id, socket.id, stream);

                        peersRefList.push({
                            peerID: user.id,
                            username: user.user.username,
                            peer,
                        })
                        peersList.push({
                            peerID: user.id,
                            username: user.user.username,
                            peer: peer,
                        });        
                    })

                    peersRef.current = peersRefList
                    setPeers(peers=>peersList)       
                }         
            })

            socket.on("user joined", payload =>{       
                const peer = addPeer(payload.signal, payload.callerID, stream);
                // peersRef.current.push({
                //     peerID: payload.callerID,
                //     peer,
                // })

                // setPeers(peers => [...peers, peer])
            })

            socket.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                if (item){
                    item.peer.signal(payload.signal);
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
            stream,
        })

        peer.on("signal", signal =>{
            socket.emit("sending signal", {userToSignal, callerID, signal})
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator : false,
            trickle:false,
            stream,
        })

        peer.on("signal", signal=>{
            socket.emit("returning signal", {signal, callerID})
        })

        peer.signal(incomingSignal);
        return peer;
    }

    //================================================
    
    //handle send answer
    const sendAnswer = async (event)=>{
        event.preventDefault();

        if (answer!==''){  
            var ansObj
            if (answer === drawWord && drawingOngoing && drawerRef.current.id !== socket.id){  
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
             

            socket.emit("add answer", {roomID: roomID, answer: ansObj});
            setAnswer('')
        }
    }

    // countdown timer bar
    const [timerCount, setTimerCount] = useState(false)
    const timer = useRef(null);
    const top5 = useRef(null);
    const top2 = useRef(null);
    const dingRef = useRef(null);


    //when state is drawing
    const onCountDown = ()=>{
        
        setTopPoint(10)
        setDrawingOngoing(true)
        setTimerCount(true)
        timer.current = setTimeout(() => {
            setTimerCount(false)
            setDrawingOngoing(false)
            onShowAnswer()
        }, 90000);

        top5.current = setTimeout(() => {
            setTopPoint(5)
        }, 45000);

        top2.current = setTimeout(() => {
            setTopPoint(2)
        }, 70000);

        dingRef.current= setTimeout(() => {
            tickingSound.play()
        }, 82000);
    }


    //========drawing============
    const [isReady, setIsReady] = useState(false) // to check if users is retrieve successfully
    const [drawWord, setDrawWord] = useState('') // the word to draw
    const [drawModal, setDrawModal] = useState(false) // open up the choose word modal
    const [isStart, setStart] = useState(false) // to start the game
    const [canvasOn, setCanvasOn] = useState(false) // is canva on or off
    const [drawingOngoing, setDrawingOngoing] = useState(false)
    // const [drawer, setDrawer] = useState({}) // the current drawer
    const [showAnswer, setShowAnswer] = useState(false)
    // const [drawerCounter, setDrawerCounter] = useState(1)
    // const [userSnapshot, setUserSnapshot] = useState([])
    const userSnapshot = useRef([])
    const [showWin, setShowWin] = useState(false)

    const drawerRef = useRef({})
    const drawerCounter = useRef(0)

    const [topPoint, setTopPoint] = useState(10)
    
    const onShowAnswer = ()=>{
        const canvas = canvasRef.current;
        const context = contextRef.current

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        answerSound.play()
        setShowAnswer(true)
        setCanvasOn(false)

           setTimeout(() => {
           setShowAnswer(false)
           setCanvasOn(true)


           if (drawerRef.current.id == socket.id){
                socket.emit('next drawer', {roomID: roomID, userSnapshot : userSnapshot.current, counter: drawerCounter.current})
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
        socket.emit("skip", roomID)
        socket.emit('next drawer', {roomID: roomID, userSnapshot : userSnapshot.current, counter: temp})
    }

    const onDraw = () =>{
        if(drawWord!== ''){
            setDrawingOngoing(true)
            // setDrawerCounter(drawerCounter=>drawerCounter+1)
            drawerCounter.current += 1
            socket.emit('draw', {roomID: roomID, word:drawWord})
            setDrawModal(false)
            onCountDown()
        } else {
            errorSound.play()
            alert('Please choose word to draw')
        }
        
    }

    const addPoint = ()=>{
        var userArr = users
        var idx = userArr.findIndex(x => x.id === socket.id);
        users[idx].user.points = users[idx].user.points + topPoint
        var temp = [...users]
        temp.sort((a, b) => (a.user.points < b.user.points) ? 1 : -1)
        setUsers([...temp])

        if (temp[0].id === socket.id){
            setJumpButton(true)
        }
        else {
            setJumpButton(false)
        }
        dingSound.play()

        socket.emit("add point", {roomID: roomID, user: temp , id: socket.id});
    }

    const minusPoint = ()=>{
        var userArr = users
        var idx = userArr.findIndex(x => x.id === socket.id);
        users[idx].user.points = users[idx].user.points - 10
        var temp = [...users]
        temp.sort((a, b) => (a.user.points < b.user.points) ? 1 : -1)
        setUsers([...temp])

        if (temp[0].id === socket.id){
            setJumpButton(true)
        } else {
            setJumpButton(false)
        }

        socket.emit("minus point", {roomID: roomID, user: temp});
    }

    const onStart = ()=>{
        socket.emit("start", {user : users[0], roomID : roomID})
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
        winSound1.play()
        winSound2.play()
        setTimeout(() => {
            setDrawModal(false)
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
        socket.emit("playagain", {roomID: roomID, id: socket.id})
    }

    const [toolChildSize, setToolChildSize] = useState(0)
    const [firstClick, setFirstClick] = useState(true)


    return(
        <div style={{width:'100vw', height:'100vh', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <div onClickCapture={()=>{ if(firstClick) togglePlaying(); setFirstClick(false); }} className="main" style={{ width:'100%', height:'100%' , flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <audio loop
                ref={audioBg} 
                src={bgmusics} 
                autoPlay={true}
            ></audio>

                {/* left */}
                <div style={{flex:1, width: `calc(100% - 320)`,  display:'flex',  flexDirection:'column',height:'100%'}}>
                    
                    {/* header */}
                    <div style={{backgroundColor: Constant.DARKER_GREY, width:'100%', minHeight:50, display:'flex', justifyContent:'space-between', alignItems:'center'}}>    
                        <img style={{objectFit:'contain', width:120, height:40,marginRight:10, marginLeft:50}} src={limedrawlogo} alt="Logo" />
                        <img style={{objectFit:'contain', width:200, height:40,marginRight:10, marginLeft:50}} src={halloweenparty} alt="Logo" />
                        <div className="logout-button" onClick={logout} style={{ height:'100%', display:'flex', alignItems:'center'}}>
                            <IoMdLogOut size={25} style={{marginRight:20}}/>
                        </div>
                    </div>

                    {/* main content */}
                    <div style={{height: `calc(100% - 50px)`, width:'100%', display:'flex', flexDirection:'column'}}>
                        {/* top */}
                        <div style={{ display: 'flex', flexDirection:'row', width:'100%', height: peers.length >=3 ?'55%' : '60%', paddingTop:'2%', paddingBottom:'2%'}}>

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
                                        style={{display: canvasOn? 'flex' : 'none'}}
                                        onMouseDown = {drawerRef.current.id === socket.id? startDrawing : null}
                                        onMouseUp = {drawerRef.current.id === socket.id? finishDrawing: null}
                                        onMouseMove = {drawerRef.current.id === socket.id? draw : null}
                                        onMouseLeave ={()=>{ if (isDrawing)finishDrawing()}}
                                        onTouchStart = {drawerRef.current.id === socket.id? startDrawing : null}
                                        onTouchEnd = {drawerRef.current.id === socket.id? finishDrawing: null}
                                        onTouchMove = {drawerRef.current.id === socket.id? draw : null}
                                        onTouchCancel = {()=>{ if (isDrawing)finishDrawing()}}
                                        ref = {canvasRef}
                                    /> 
                                    

                                    {/* canvas place for other stuffs */}
                                    
                                    <div ref={canvasPlace} style={{display: canvasOn?'none':'flex',  borderRadius:15}}>
                                        {isReady && users.length > 1 &&  !showWin?
                                        
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%'}}>

                                            {!isStart && users[0].id === socket.id ?
                                           
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
                                                <span style={{fontWeight:'bold', fontSize:20, marginBottom:20, color:Constant.PRIMARY_COLOR}} >Waiting for friends to join the room...</span>
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
                        <div style={{height: peers.length >=3 ?'45%' : '40%', display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
                            <div style={{position:'relative',marginLeft:10, marginRight:10, marginBottom: 5, height: videoHeight, width: videoWidth }}> 
                                <video id="videoElement" style={{backgroundColor:'#444',  border:drawerRef.current.id === socket.id ?'4px solid #CD0094': '0px',borderRadius:10, justifyContent:'center',  height: videoHeight, width: videoWidth , objectFit: "cover" }} ref={userVideo} autoPlay playsInline/> 
                                <div style={{ color:'white', position:'absolute', bottom:'3%', left:'5%', backgroundColor:'rgba(0,0,0,0.4)', paddingTop:2, paddingBottom:2, paddingLeft:5, paddingRight:5, borderRadius:3}}>
                                    {myself.username}
                                </div>
                            </div>


                           {peers.map((peer,index)=>{
                               return <Video key={index} peer={peer} scare={scare} drawer={drawerRef.current.id} height={videoHeight} width={videoWidth}/>
                           })}                        
                            


                        </div>
                    </div>
                </div>
                
                {/* right */}
                <div style={{backgroundColor:Constant.DARKER_GREY, width: 320, height:'100%', borderLeft: "1px solid #2B2B2B"}}>

                    {/* POINTS */}
                    <div style={{ height: `calc(100% *0.5)`, width:'100%'}}>

                        {/* header */}
                        <div style={{backgroundColor:Constant.LIGHTER_GREY, height: '40px', paddingRight:16, paddingLeft:16, display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <span style={{color:"white", fontWeight:'bold' ,fontSize:14}}>Points</span>
                            <div className="invite-button" onClick={invite} style={{cursor:'pointer', color:'white', padding:5, borderRadius:5, fontSize:13, fontWeight:'bold'}}>
                                + Invite friends
                            </div>
                        </div>

                        {/* content */}
                        <div style={{display:'flex', backgroundColor: Constant.DARKER_GREY, flexDirection:'column', overflowY:'scroll', height: `calc(100% - 50px)`, paddingLeft:10, paddingRight:5, paddingTop:5, paddingBottom:5 }}>
                            {users.map((e, index)=>{
                                return <RenderPoints item={e} idx={index} key={index}/>
                            })}
                        </div>
                    </div>

                    {/* ANSWER */}
                    <div style={{ height: `calc(100% *0.5)`, width:'100%', display:'flex',  flexDirection:'column'}}>

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
                            <AiOutlineCloseCircle size={25} color="white"/>
                            <AiOutlineCloseCircle size={25} color="black" />
                        </div>
                        <img style={{width:'40%', height:'auto'}} src ={nenek} alt={"invite picture"}/>
                        <span style={{fontWeight:'bold', fontSize:18, color: Constant.PRIMARY_COLOR, marginBottom:16}}>Link Copied!</span>  
                        <span style={{border:'1px solid lightgrey', color:'grey', borderRadius:10, fontSize:14, padding:10}}>{"https://limedrawio.herokuapp.com/enter/"+roomID}</span>
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
                                    setDrawWord(val.target.value)
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

                {/* jumpscare */}
                <img src={ghost1}  style={{display:isjumpscare?'flex': 'none', objectFit:'cover' ,position:'absolute', width:'85%', height:'85%', backgroundColor:'white', borderRadius:15}}/>  
                
                {playing ? 
                <div onClick={()=>{setPlaying(false)}} className="bgsound-button" style={{position:'absolute',borderRadius:5,  width:35, height:35, display:'flex', justifyContent:'center', alignItems:'center',  bottom:20, left:20}}>
                    <IoMdVolumeHigh size={25} color="white"/>
                </div>
                :
                <div onClick={()=>{setPlaying(true)}} className="bgsound-button" style={{position:'absolute',borderRadius:5,  width:35, height:35, display:'flex', justifyContent:'center', alignItems:'center',  bottom:20, left:20}}>
                    <IoMdVolumeOff size={25} color="white"/>
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


        </div>
        
    );
}
export default Main;