import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import './main.css';
import './my_ui.css';
import {  NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

import {CSSTransition} from 'react-transition-group';

//import Background from './back_img_v1.jpg';

import logo from './logo4.png';
import ip from './store/ip_provider';
import Selector from './entry/selector';
import {getType} from "./redux/actions";

//import querystr from "querystring";

const style = {
    width: "100%",
  //  backgroundSize :"cover",
   // backgroundClip: 'none',
   // backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    height: "100%",
    //backgroundColor : '#261326',
    backgroundImage:"linear-gradient(to bottom right, #261326, #2d1b3d)",
 //   backgroundRepeat: 'repeat',
    position: 'static',

   // backgroundImage: "linear-gradient(to top,#261326,#261326)",
   // bottom:"1000px",

};

function add(str){
    return (ip()+str);// api-ip http required
};




class main extends React.Component {

    constructor(props) {
        super(props);
        this.all_it =[];

        this.first=true;
        this.date="";

    //http://127.0.0.1:8080/api/types
/*
        Axios.get(ip()+'/api/types', {params: {str:""}}).then((res) => {
            this.all_it=res.data;   }

        ).catch((err) => {
            console.log(err)
        }); */


        this.state = {
            visible:false,
            display:[], // {info , icon }
            value:""
        };

        this.scope="scop1";

    }

    componentDidMount() {
        if(this.props.loaded){
            this.all_it = this.props.types
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((this.props.loaded)&&(!prevProps.loaded)){
            this.all_it = this.props.types
        }
    }

    typeHandler= event =>{
        this.scope="scop2";
        let tmp = [];

        if(/[!$%^&*()+|~=`{}\[\]:\/;<>?,.@#]/.test(event.target.value)){
            return 0;
        };


        let rg = new RegExp("^"+event.target.value);

        this.all_it.forEach((i)=>{
            if((rg.test(i.info))&&(tmp.length<6)){
                tmp.push({info:i.info, icon:i.icon});
            }
        });


        this.setState({display:tmp,visible:true,value:event.target.value});

        //this.forceUpdate();

    };
    clickhandler= event =>{
        let str = event.target.innerHTML;
        str = str.replace(/^ | $/,"");
        str = str.replace(/^ | $/,"");

        this.setState({value:str,visible:false});

    };
    reduce_visible = event =>{

        this.setState({visible:false});
    };


    alert= event =>{
        alert(this.date);

          
    };
    date_handler = event =>{
        console.log(event.target.value);
        this.date = event.target.value;
    };
    date_focus = event =>{
        if(this.first){
            this.first=false;
            let today = new Date().toISOString().slice(0, 10);
            event.target.value=today ;
            this.date=today;
        }
    };
    recherche = event =>{
        if(this.state.value!==""){

            if(this.date!==""){
                this.props.history.push("/app/recherche?type="+this.state.value+"&date="+this.date);
            }
            else{
                this.props.history.push("/app/recherche?type="+this.state.value);
            }

        }
        else{

            if(this.date!==""){
                this.props.history.push("/app/recherche?date="+this.date);
            }
            else{

                this.props.history.push("/app/recherche");

            }

        }



    };




    render() {

        return (
            <div onClick={this.reduce_visible} className={"main col-xs-12 zero_pad_v2"} style={style} >

                <div className={"col-md-1"}> <img id={"img_logo"} src={logo} width={"80px"} height={"60px"} /> </div>
                <NavLink to={"/app/actuality"}
                         className={"col-md-2  my_button_v1  col-xs-5"}> Le plus récent </NavLink>
                <NavLink to={"/app/poster"}  className={"col-xs-offset-1 hidden-sm hidden-md hidden-lg col-xs-4 my_button_v1"}> Publier Mon Objet </NavLink>

                <div className={"col-md-offset-4 col-md-5 topper hidden-xs"}>

                    <NavLink to={"/app/poster?pst"} className={"col-md-4 my_button_v1"}> Publier Mon Objet </NavLink>
                    <NavLink to={"/aide"}  className={" col-md-offset-1 col-md-2 my_button_v1  "}>  Aide   </NavLink>
                    <NavLink to={"/login"}  className={"col-md-offset-1 col-md-3 my_button_v1"}>  {(()=>{
                        if(localStorage.getItem("login")===null){
                            return "Connexion"
                        }
                        else{
                            return "Mon Profil"
                        }
                    })()} </NavLink>
                </div>

                <div className={"col-md-4 col-md-offset-1 col-xs-12  circular_box holder_test"} style={{marginTop:"10px"}}>

                    <h1 className={"extend_on_fhd"}> </h1>

                    <h1>

                        Trouvez vos objets perdus ou leurs Propriètaires dans l'ESI
                    </h1>
                    <h1 className={"extend_on_fhd"}></h1>



                    <div className={"col-md-10 col-md-offset-1"}>
                        <label className={"small_title "} htmlFor={"rech"}> Quoi </label>
                        <input type={'text'} placeholder={"Mon Object"} autoComplete={"off"} className={"my_text_box_v2"} value={this.state.value} id={"rech"} onChange={this.typeHandler}/>
                    </div>
                    <div className={"col-xs-12 list_hold"}>
                        <div id={"holder"} className={"col-xs-10 list"}>

                            {
                                this.state.visible &&( this.state.display.map((i)=>{
                                    return (<div className={" list_item col-xs-11 col-xs-offset-1"} key={i.info.toString()} >
                                        <div className={"glyphicon glyphicon-"+i.icon+"  span col-xs-1"}> </div>
                                        <div onClick={this.clickhandler} className={"col-xs-8 col-xs-offset-1 inc"} > {i.info.toString()} </div>
                                    </div>);
                                }) )

                            }



                        </div>
                    </div>

                    <div className={"col-xs-12"}> <h1> </h1> </div>

                    <div className={"col-xs-12"}> <h1 className={"extend_on_fhd"}> </h1> </div>

                    <div className={"col-md-10 col-md-offset-1"}>
                        <label htmlFor="dateofbirth" className={"small_title"}>Quand</label>
                        <input type="date" name="dateofbirth" id="dateofbirth" onChange={this.date_handler} onFocus={this.date_focus}/>
                    </div>

                    <div className={"col-xs-12"}> <h1 className={"extend_on_fhd"}> </h1> </div>

                    <div className={"col-md-12  circular "}>
                        <h1> </h1>
                        <input type={"button"} value="    Recherche     " onClick={this.recherche} className={"my_button_v2"}/>
                    </div>




                </div>
                <div className={"col-md-offset-2 col-md-4 hidden-xs"}>


                    <Selector />




                </div>

                <div className={"col-xs-12 hidden-lg hidden-md hidden-sm"} style={{backgroundColor:"#261326",minHeight:"50px",margin:"0px"}}> <h1 className={"extend_on_fhd"}> </h1> </div>


                <div className={"col-xs-12 end_style hidden-lg hidden-md hidden-sm "} style={{color:"white",backgroundColor:"#261326"}} >
                    <div className={"col-xs-8"} style={{textAlign:"center"}}> ESI TO FIND `@2019</div>
                    <div className={"col-xs-4"} style={{textAlign:"right"}}> <NavLink to={"/aide"}  className={"my_button_v1"} > Aide </NavLink></div>
                </div>


                {(window.screen.width>1500)&&<div className={"col-xs-12 end_style   hidden-xs hidden-md hidden-sm "}
                     style={{color:"white",backgroundColor:"#261326",position:"absolute",bottom:"0px"}} >
                    <div className={"col-xs-8"} style={{textAlign:"center"}}> ESI TO FIND `@2019</div>
                    <div className={"col-xs-4"} style={{textAlign:"right"}}> <NavLink to={"/aide"}  className={"my_button_v1"} > Aide </NavLink></div>
                </div>}

            </div>


        );


    }
}
const mapStateToProps = (state)=>{


    return {
        types:state.type.types,
        loaded:state.type.loaded
    }
}

const mapDispatchToProps = {

        getType

}

export default connect(mapStateToProps,mapDispatchToProps)(main);