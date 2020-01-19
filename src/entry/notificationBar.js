
import {getNotifications , notificationSeen} from '../redux/actions'

import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import  { NavLink  } from "react-router-dom";
import '../my_ui.css';

const BarNotif = (props)=>{

    const [toggled, setToggle] = useState(false);

    const [connected,setConnect] = useState(false);

    const [info,SetInfo] = useState({});



    useEffect(()=>{
        let test = localStorage.getItem("login");
        let val ;
        if(test!==null)
            try{
                val = JSON.parse(test);
                let sending = val.mail.substring(0,19) ;


                props.getNotifications(val._id) ;

                setConnect(true);

                SetInfo(val);

                if(sending.length!==val.mail.length){
                  //  return sending+"..";
                }
                else{
                  //  return sending;
                }
            }
            catch (e) {

            }


    },[]);

    console.log(props)

    if(connected){

        if(toggled){
                return <div className={props.className}  onClick={()=>{
                setToggle(!toggled)}
                }> <span className={"glyphicon glyphicon-bell"} style={{color:"#eb2648"}}> </span>  toggled </div>
        }
        else{
            //return <NavLink to={"/profile"} className={props.className}> {info.mail} </NavLink>

            return <div className={props.className} onClick={()=>{
                setToggle(!toggled)
            }}> {info.mail}  {(()=>{
                if((props.notification.notifications!==undefined)&&(props.notification.notifications.length>0)){
                return <span className={"glyphicon glyphicon-bell"} style={{color:"#eb2648"}}> </span> ;
            }  })()} </div>
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
        }

    }
}

const mapDispatchToProps = {

    getNotifications , notificationSeen

}
export default connect(mapStateToProps,mapDispatchToProps)(BarNotif);