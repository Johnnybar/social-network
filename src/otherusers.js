import React from 'react';
import axios from 'axios';


// export default function OtherUsers (props){
//     var id = props.params.id;
//     console.log('this is the id in OtherUsers ',id);
//     axios.get('/otherUsersJson?id='+id)
//         .then((resp)=>{
//             console.log('this is the first name in OtherUsers ',resp.data.data.first)
//             return (
//                 <div>
//                 <h1>{resp.data.data.first}</h1>
//                 </div>
//             )
//         })
// }


export default class OtheUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

componentDidMount() {//CHECK OUT MEANING OF THIS
  let id = this.props.params.id
  axios.get('/otherUsersJson?id='+id).then(({data}) => {//CHECK OUT WHAT ?id does here
    this.setState(data.data);//CHECK IF NECESSARY
    console.log('state', this.state);
  })
}

  render() {

return (<div>
<h1>{this.state.first}</h1>
<h1>{this.state.bio}</h1>
<img src={this.state.imgurl}/>
</div>)
  }
}
