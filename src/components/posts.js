import React ,{Component} from 'react'
import faker from 'faker'
import PostDetail from './postDetail'
import Card from './card'
import '../App.css';
export default class Post extends Component{
    constructor(){
        super();

    }

    render(){

        return(
            <div className='as' style={{display:'flex',justifyContent:'center',width:'100%',}}>
                   <div className='ui container comments' >
                   <Card>

                   <PostDetail 
                   Name='Aijaz' 
                   time={'11:45 pm'}
                   content={'nice picture'}
                   image ={faker.image.avatar()}
                   />
                   </Card>
<Card>

                   <PostDetail 
                   Name='Aneela' 
                   time={'12:5 pm'}
                   content={'Its looking pretty'}
                   image ={faker.image.avatar()}
                   />

</Card>

<Card>

                   <PostDetail 
                   Name='jhon' 
                   time={'12:45 pm'}
                   content={'I was busy'}
                   image ={faker.image.avatar()}
                   />
                   </Card>
                   </div>
            </div>
        )
    }
} 
