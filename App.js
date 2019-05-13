import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/posts'
import app from 'firebase' 
import * as firebase from 'firebase'
import { tsLiteralType } from '@babel/types';
require('firebase/auth')
require('firebase/database')


class App extends Component{
  constructor(){
    super();
    this.state={
      email:'',password:'',cpassword:'',wrong:'',match:'',msg:'',loader:false,ap:0,
      sup:true,sin:false,dekhao:false,home:false,user:'',speed:0,registerd:0,loggedIn:0,
    }
    this.authListener()
    firebase.database().ref().child('speed').on('value', snap => {
      this.setState({
        speed : snap.val()
      })
      
    })
    firebase.database().ref().child('loggedin').on('value', snap => {
      this.setState({
       loggedIn  : snap.val()
      })
      
    })

    
  }

  componentDidMount(){ 
    let { registerd, loggedIn } = this.setState;
    // console.log('ffffffffff===>>',firebase.database().ref().child('speed').set( this.state.registerd ));
  //   firebase.database().ref().child('speed').on('value', snap => {
  //   this.setState({
  //     speed : snap.val()
  //   })
  if(localStorage.getItem('uid')){

    let uid = localStorage.getItem('uid')
    firebase.database().ref().child(uid).on('value', snap => {
      this.setState({ap:snap.val()})
    })
  }
  
  // })
  // firebase.database().ref().child('loggedin').on('value', snap => {
  //   this.setState({
  //    loggedIn  : snap.val()
  //   })
    
  // })
  }
  signup(){
    let { email, password, cpassword,registerd } = this.state;
    this.setState({loader:true})

    if( email && password.length === 7 && password === cpassword){
     app.auth().createUserWithEmailAndPassword(email, password).then(user=>{

        console.log('user',user);

        this.setState({loader:false,sup:false,dekhao:true,registerd:registerd + 1})

        firebase.database().ref().child('speed').on('value', snap => {
          this.setState({
            speed : snap.val()
          })
          
        })
        
        setTimeout(()=>{
          this.login()
          firebase.database().ref().child('speed').set( this.state.speed + 1 );
        },2000)

      }).catch(err=>{
        console.log('err==>>',err);
        // alert(err.message)
        this.setState({msg:err.message})
        
      })
    }else{
      this.setState({msg:"Please fill all the fields correctly"})
    }
  }
  //password
  password(e){
let text = e.target.value
this.setState({msg:''})
this.setState({loader:false})
    this.setState({password:e.target.value})

      if( text.length < 7){
        this.setState({wrong:'Password length should be 7 characters long.'})
      }else{this.setState({wrong:''})}
  }

  cpassword(e){
    let { password } = this.state;
let text = e.target.value
    this.setState({cpassword:e.target.value})

      if( text !== password){
        this.setState({match:'Password not matched...'})
      }else{this.setState({match:'Matched'})
      setTimeout(()=>{
        this.setState({match:''})
      },1000)
    }
  }

  authListener(){
    app.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({user})
      }else{
        this.setState({user:'',})
      }
    })
  }
  //Confirm password
  

  login(){
    
    
    let { email, password, loggedIn } = this.state;
app.auth().signInWithEmailAndPassword(email, password).then((u)=>{
  console.log('user',app.auth().currentUser.uid);
  if(u){
   
localStorage.setItem('uid',app.auth().currentUser.uid)
      firebase.database().ref().child(app.auth().currentUser.uid).on('value', snap => {
        this.setState({ap:snap.val()})
      })
    

 setTimeout(()=>{

   firebase.database().ref().child(app.auth().currentUser.uid).set(++this.state.ap);
  },1000)

  
    firebase.database().ref().child('users/').set(app.auth().currentUser.uid);
    

      // firebase.database().ref().child(app.auth().currentUser.uid).set(++count);
    

    this.setState({dekhao:false,home:true,sin:false,msg:'',})
    firebase.database().ref().child('loggedin').on('value', snap => {
      this.setState({
        loggedIn : snap.val()
      })
      
    })
   
    setTimeout(()=>{
      firebase.database().ref().child('loggedin').set( this.state.loggedIn + 1 );
    })
  }
  }).catch(err=>{
  console.log('err==>>',err);
  this.setState({msg:err.message})
})
  }

  log(){
    let{ wrong, match, msg, loader } = this.state;
      return(
          <div>
          
<legend>Signup</legend>
            <input className='name' placeholder='Email' onChange={(e)=>{this.setState({email:e.target.value})}} type='text'/>
            <p>{wrong}</p>
            <input className='password'placeholder='Password' onChange={(e)=>{this.password(e)}}  type='password'/>
            <p>{match}</p>
            <input className='password'placeholder='Confirm Password' onChange={(e)=>{this.cpassword(e)}}  type='password'/><br/>
            <p>{msg}</p>
            {!msg && loader &&<div> <img src={logo} style={{height:'30px'}} className="App-log" alt="logo" />
     <br/></div>}
            <button onClick={()=>{this.signup()}} >signup</button>
         
          </div>
        )
      }
      logout(){
        let { loggedIn,user } = this.state;
        app.auth().signOut().then(()=>{
this.setState({home:false,})
localStorage.removeItem('uid')
if(loggedIn != 0){

  firebase.database().ref().child('loggedin').set( this.state.loggedIn - 1 );
}
        })
      }

home(){
  return(
    <div>
      Welcome to home Screen...
    </div>
  )
}


      render(){
        let { sup,sin, dekhao,msg,user,speed,loggedIn,ap,s } = this.state;
    // let d = nbsp;
    return (
      <div className="App">
      {
        speed &&
      <div>

      <header className="App-header">
      <div style={{fontSize:'13px',padding:'3px'}}>

      {'Total Registerd : ' + speed +' ..... '+' LoggedIn : '+' '+' '+loggedIn }{ user && ' .....  You Login '+ap+' times'}
      </div>
      <div className='logo' style={{color:'white',paddingTop:'-300px'}}>
<p style={{color:'white',marginTop:'14px',fontSize:'25px'}} >Firebase Login & SignUp</p>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </div>
      <div className='btn' >
        {!user &&<button onClick={()=>{this.setState({sin:false,sup:true,email:'',password:'',cpassword:'',})}}style={{margin:'5px'}}>SignUp</button>}
        {!user &&<button onClick={()=>{this.setState({sin:true,sup:false,email:'',password:'',cpassword:'',})}} >SignIn</button>}
        {user &&<button onClick={()=>{this.logout()}} >Logout</button>}
      </div>
      
       {!user && sup && this.log()}
       {dekhao && <div>'Your account is created ..'<br/>'Now you are logging in with same Id. '<br/><img src={logo} style={{height:'30px'}} className="App-log" alt="logo" /> </div>}

       {sin && !user && <div>Login <br/>
       <input className='name' placeholder='Email' onChange={(e)=>{this.setState({email:e.target.value})}} type='text'/><br/>
            <input className='password'placeholder='Password' onChange={(e)=>{this.setState({password:e.target.value})}}  type='password'/><br/>
            <p>{msg}</p>
            <button onClick={()=>{this.login()}} >login</button>
       </div>}
{user &&
<div>

{this.home()} 
<Post/>
</div>
}
<br/>
<br/>

      
      </header>
      </div>}
    </div>
  );
}
}

export default App;
