
import {getNotifications , notificationSeen} from '../redux/actions'

import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import  { NavLink  } from "react-router-dom";
import { withRouter } from 'react-router' ;
import '../my_ui.css';
import './notifBar.css' ;

const BarNotif = (props)=>{

    const [toggled, setToggle] = useState(false);

    const [connected,setConnect] = useState(false);

    const [info,SetInfo] = useState({});

    const [available,setAvailable] = useState(0) ;



    const hide = () =>{
        setToggle(false) ;
    };

    useEffect(()=>{

       if(props.notification.loaded){
           let nb=0 ;
           props.notification.notifications.forEach((i)=>{
               if((i.not_done===0)&&((i.not_type==="interaction"))){
                   nb++ ;
               }
           }) ;
           setAvailable(nb) ;
       }
    },[props.notification]) ;


    useEffect(()=>{

        props.history.listen((location, action) => {
            hide() ;
        });

        document.addEventListener("scroll",hide);


        let test = localStorage.getItem("login");
        let val ;
        if(test!==null)
            try{
                val = JSON.parse(test);

                props.getNotifications(val._id) ;

                setConnect(true);

                SetInfo(val);

            }
            catch (e) {
            }

        return (()=>{
            document.removeEventListener('scroll', hide);
        })
    },[]);



    if(connected){

        if(toggled){
                return <div className={props.className +" zero_pad"}  onClick={()=>{
                setToggle(!toggled)}
                }>  {info.mail}

                    <div className={"global_bar  zero_pad"}>
                    <div className={" inner_bar  zero_pad"}>

                        <NavLink className={" zero_pad disable_navlink col-xs-7"}  to={'/profile'}>
                            <div className={"my_button_forgot notif_profile_link"} style={{borderBottom:"solid 1px #B6B4B6"}} >Mon Profile </div></NavLink>


                        <div className={" zero_pad disable_navlink col-xs-5"} onClick={()=>{
                            localStorage.clear();
                            window.location.reload() ;
                        }} style={{borderLeft:"solid 1px #B6B4B6"}} >

                            <div style={{borderBottom:"solid 1px #B6B4B6"}} className={"my_button_forgot notif_profile_link"}>Déconnexion </div></div>




                        {
                            props.notification.notifications.map((i)=>{
                                if(i.not_type==="interaction"){
                                    return <div className={"notif_item col-xs-12 zero_pad "+(()=>{
                                        if(i.not_done===1){return "notif_item_done"}
                                    })()} style={{fontSize:"80%"}} key={i.not_id} onClick={()=>{

                                        props.notificationSeen(info._id,i.not_id) ;

                                       setTimeout(()=>{
                                           window.location = "/profile/post/"+i.not_objects ;
                                       },500) ;
                                       // props.history.push("/profile/post/"+i.not_objects ) ;

                                    }}>
                                        <div className={"col-xs-8"}>

                                             <div style={{color:"#261326",fontWeight:"bolder",display:"contents"}}>  {i.not_source}</div> a répondu à votre publication
                                            <div style={{color:"#261326",fontWeight:"bolder",display:"contents"}}> {(()=>{
                                                let date1 = new Date();
                                                let date2 = new Date(i.not_time);



                                                let nb=  Math.floor (( date1.getTime() - date2.getTime()) / (1000 * 3600 * 24) ) ;

                                                if(nb===0){
                                                    return " il y "+Math.floor(( date1.getTime() - date2.getTime()) / (1000 * 3600))+" heures "
                                                }
                                                else{
                                                    if(nb<8){
                                                        return " il y a "+nb+" Jours "
                                                    }
                                                    else{
                                                        return " il y a "+Math.floor(nb/7)+" semaines"
                                                    }
                                                }

                                            })()}</div>

                                        </div>
                                        <div className={"col-xs-2"}> {(i.not_done===1)&&<div > Vu </div>} </div>
                                        <div className={"col-xs-2"}>
                                        <div  style={{backgroundColor:"#261326",fontSize:"150%",color:"white",paddingTop:"5px",borderRadius:"10px 10px"}}>

                                            <span className={"glyphicon glyphicon-"+(()=>{ let found = false ; let j = 0 ;
                                            while(!found&&j<props.type.types.length){

                                                if(props.type.types[j].info===i.object_type){
                                                    found = true ;
                                                    return props.type.types[j].icon ;
                                                }
                                                else{
                                                    j++ ;
                                                }
                                            }
                                        })()}> </span></div>

                                        </div>




                                    </div>

                                }

                            })
                        }

                        {
                            (props.notification.notifications.length===0)&&<div className={"notif_item col-xs-12 zero_pad"} >
                                <div style={{color:"#261326",fontWeight:"bolder",width:"100%"}}>  Aucunne notification </div>  </div>
                        }

                        <div className={"end_notif_display col-xs-12 zero_pad"} onClick={()=>{
                            setToggle(false) ;
                        }}> Réduire <span className={"glyphicon glyphicon-chevron-up"}></span> </div>

                    </div>
                    </div>

                    </div>
        }
        else{
            //return <NavLink to={"/profile"} className={props.className}> {info.mail} </NavLink>

            return <div className={props.className+" no_extend_bar"}  onClick={()=>{setToggle(!toggled)}}> {info.mail+" "}


            {(()=>{
                if(available){
                    ; return  <span className={"glyphicon glyphicon-flag"} style={{color:"#eb2648",display:"inline-block"}}>
                      </span>
            }else{
                    return <span className={"glyphicon glyphicon-flag"} style={{color:"#1C39BB",display:"inline-block"}}>
                </span>;
                }  })()}


            </div>
        }
    }
    else{

        return <NavLink to={"/login"} className={props.className}> Connexion </NavLink>
    }




};

const mapStateToProps = (state)=>{


    return {
        notification : {
            loaded: state.notification.loaded,
            notifications : state.notification.notifications
        },
        type : {
            loaded:state.type.loaded ,
            types:state.type.types
        }

    }
}

const mapDispatchToProps = {

    getNotifications , notificationSeen

}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(BarNotif));