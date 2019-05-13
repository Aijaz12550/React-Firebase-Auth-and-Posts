import React ,{Component} from 'react'
import faker from 'faker'
export default class PostDetail extends Component{
    constructor(){
        super();

    }

    render(){

        return(
            <div className='comment'>
                   <a href='/' className='avatar'>
                   <img style={{border:'solid 1px',borderRadius:'30px',width:"60px",}} alt='avatar' src={this.props.image} />
                   </a>
                   <div className='content' style={{fontSize:'18px',display:'relative'}}  >
                   <a href='/' style={{fontSize:'18px',marginLeft:'-180px'}} className='author'>
                   {this.props.Name}
                   </a>
                   <div className='metadata'>
                   <span className='date' >{this.props.time}</span>
                   </div>
                   <br/><br/>😀
                   <div className='text'>{this.props.content}</div>
                   </div>
                   </div>
                   
        )
    }
} 
