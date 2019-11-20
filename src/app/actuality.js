import React from 'react';

import '../my_ui.css'
import './actuality.css'

import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ip from '../store/ip_provider';
import querystr from "querystring";
import Article from "./object";

import Instruction from './instruction';
import Lower from './phone_button'
import {ClipLoader} from "halogenium";




function add(str){
    return (ip()+str);// api-ip http required
};

const is_mobile = function is_mobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}() ;

const style = {
    //width: "100%",

    backgroundSize :"cover",
    // backgroundColor : '#261326',
    backgroundColor: '#f9fbfb',
    textAlign: "center",
    position : 'static',
    minHeight:"100%",
    height:"100%",
    zIndex:"0",
    display:"flex",



};

const Article_style ={

    backgroundColor: '#f9fbfb',
    position :"inherits"

};


const end_style={
    minHeight: "60px",
    backgroundColor: "#2e3131",
    color: "white",
    padding: "20px",
    textAlign: "center"
};



class Actuality extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            views:[],
            traslator:{},
            updated:false,

            on_update:false
        };
        this.gotten = [] ;

        this.height1 = 0 ;
        this.height2 = 0 ;

        this.on_update = false ;


        this.all_it=[];
        this.traslator = {} ;



        Axios.get(add('/api/types'), {params: {str:""}}).then((res) => {
                this.all_it=res.data;
                let tmpl = {} ;
                this.all_it.forEach((i)=>{
                    tmpl[i.info]=("glyphicon glyphicon-"+i.icon );
                });
                this.traslator = tmpl ;
                this.setState({updated:true,translator:tmpl});
            this.get_page();
            }
        ).catch((err) => {
            console.log(err)
        });

    }



    componentDidMount() {
        document.addEventListener("scroll",this.update_required);
    }

    update_required = event =>{
        this.height1 = ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight ) + window.pageYOffset );
        // console.log(this.height1);
        this.height2 = document.documentElement.scrollHeight ; ///height2 is static
        //  console.log(this.height2);
        if((this.height2<(this.height1+200))&&(!this.on_update)){
           this.on_update = true ;

            this.get_page();
            console.log("trigger");


        }
    };

    componentWillUnmount() {
        document.removeEventListener('scroll', this.update_required);
    }


    get_page = event =>{

        this.on_update = true;

        this.setState({on_update:true});

        Axios.post(add("/api/actuality"), querystr.stringify({
            old_vals: JSON.stringify(this.gotten)

        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res)=>{
            console.log(res.data);
            res.data.forEach((i)=>{
               this.gotten.push(i._id)  ;

                this.on_update = false;

            });

            this.setState({views:[...this.state.views,...res.data]});
            this.setState({on_update:false});

        }).catch((err)=>{console.log(err); this.setState({on_update:false});
            this.on_update = false;});


    };



    render(){
        return <div className={"col-xs-12 zero_pad_v2"}>
            <div className={"col-xs-12"}>
                <h3> Trouvez tous les objects perdus et trouvés en temps Réel
                </h3>
                <div className={"col-xs-12 interline liner"}></div>
            </div>




            <div className={"col-xs-12 zero_pad_v2"} style={style}>
                <div className={"testing   zero_pad zero_pad_v2"} style={Article_style}>

                    {

                        ( this.state.views.map((i)=>{
                            return(
                                <div className={" col-md-4 col-sm-6 zero_pad"} key={i._id}>
                                    <Article style={Article_style} {...i} indepandante={true} icon={this.traslator[i.type]} v_mobile={is_mobile} />
                                </div>
                            );
                        }))

                    }

                    <ClipLoader  color={"#ff5774"} size="100px" margin="60px" loading={this.state.on_update} />

                </div>

                <div className={"bonus_right"}> <Instruction></Instruction> </div>

            </div>



            <div className={" col-xs-12"}  style={end_style}>
                ESI TO FIND `@2019
            </div>
            <Lower />



        </div>
    }


}
export default Actuality;