import React from 'react';
import './recherche.css';
import '../my_ui.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom";


class button extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            detail:false
        }

    }
    go_poster = event =>{
        // document.querySelector("#type_recherche_valeur").focus();
       // window.scrollTo(0,0);
       // this.props.history.push("/app/poster");
        this.setState({detail:!this.state.detail})
    };

    componentDidMount() {
        document.addEventListener("scroll",this.disable_detail);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.disable_detail);
    }

    disable_detail = event =>{
      this.setState({detail:false})
    };

    render() {

        return <div>


            <div className={"add_btn add_btn_base"} onClick={this.go_poster}>
                <span className={"glyphicon glyphicon-menu-"+(()=>{
                    if(this.state.detail){
                        return "down";
                    }
                    else {
                        return "up";
                    }
                })() }> </span>
            </div>


            {this.state.detail && <div onClick={()=>{
                window.scrollTo(0,0);
            }
            }>

                <NavLink to={"/profile"} className={"add_btn_first add_btn"}> <span className={"glyphicon glyphicon-home"}></span></NavLink>


                <NavLink to={"/app/poster"} className={"add_btn_second add_btn"}> <span className={"glyphicon glyphicon-pencil"}></span></NavLink>

                {false&&<div className={"add_btn_third add_btn"}> <span className={"glyphicon glyphicon-user"}></span></div>}



            </div>}



        </div>
    }



}

export default button;