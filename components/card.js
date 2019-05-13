import React ,{Component} from 'react'
import FbImageLibrary from 'react-fb-image-grid'
import faker from 'faker'
export default class Card extends Component{
    constructor(){
        super();

    }

    render(){
const images = [
    
    faker.image.avatar(),  faker.image.avatar(),  faker.image.avatar(),  faker.image.avatar(),  faker.image.avatar(),  faker.image.avatar(),
]
        return(
          <div className='ui card' style={{maxWidth:'750px',width:'100%',}} >
          <div className='content'>{this.props.children}</div>
<div className='extra content'>
<div className='content'><FbImageLibrary images={images}  /></div>
<br/><br/>
<div className='ui two buttons' >
<div className='ui basic green button' >Like</div>
<div className='ui basic gray button' >Comment</div>
</div>
</div>
          </div>
        )
    }
} 
