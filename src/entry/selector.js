import React from 'react' ;
import 'bootstrap/dist/css/bootstrap.min.css';
import '../my_ui.css';
import './selector.css';




class selector extends React.Component{
    constructor(props){
        super(props);
       this.state = {
           school:"esi"
       };

       this.schoolss = [

           {
               id:"esi",
               onEvent:this.shcool_choice_esi,
               txt:"Ecole nationale supérieur d'informatique"

           },
           {
               id:"ziania",
               onEvent:this.shcool_choice_ziania,
               txt:"Faculté de Médecine  d'alger"

           }

       ];


        this.set_ecole_value = this.set_ecole_value.bind(this);
    }
    shcool_choice_esi = event =>{
        this.setState({school:"esi"})

    };
    shcool_choice_ziania = event =>{
        this.setState({school:"ziania"})

    };

    set_ecole_value= (val) =>{
        this.setState({school:val});
    };

    show_all_them(){

        console.log(this.schoolss);

      this.schoolss.forEach((i)=>{
          return  <div key={i.id} id={i.id} className={"col-xs-12 "+i.id+"_school school "+(()=>{
              if(this.state.school===i.id){
                  return "selected_school"
              }
              else{
                  return "unselected_school"
              }
          })()} onClick={i.onEvent}>
              <div onClick={i.onEvent}  style={{

                  backgroundColor: "rgba(0,0,0,0.4)"
              }}> i.txt</div>
              <h2 onClick={i.onEvent} style={{
                  backgroundColor: "rgba(0,0,0,0.4)"
              }}> {i.id.toUpperCase()} </h2>
          </div>

      })
    };

    render(){

        return <div className={"col-xs-12 all_school"}  >

            <div className={"col-xs-12 interline"}><h2 className={"interline"}> Esi-To-Find se lance sur :</h2> </div>




            <div id={"esi"} className={"col-xs-12 esi_school school extend_on_fhd "+(()=>{
                if(this.state.school==="esi"){
                    return "selected_school"
                }
                else{
                    return "unselected_school"
                }
            })()} onClick={this.shcool_choice_esi}>
                <div onClick={this.shcool_choice_esi} style={{

                    backgroundColor: "rgba(0,0,0,0.4)"
                }}>

                    <h1 className={"extend_on_fhd"}> </h1>
                    Ecole nationale supérieur d'informatique
                    <h1 className={"extend_on_fhd"}> </h1>
                </div>
                <h2 onClick={this.shcool_choice_esi} style={{
                    backgroundColor: "rgba(0,0,0,0.4)"
                }}> ESI </h2>
            </div>


            <div className={"extend_on_fhd"}> </div>



            <div className={"col-xs-12 school_next school extend_on_fhd"} >

                <div style={{
                    backgroundColor: "rgba(0,0,0,0.4)"
                }}>
                    <h1 className={"extend_on_fhd"}> </h1>
                    Contactez nous sur  esitofind@esi.dz
                    <h1 className={"extend_on_fhd"}> </h1></div>


            </div>



        </div>
    }
}

export default selector ;