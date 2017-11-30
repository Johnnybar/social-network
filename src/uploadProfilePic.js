export default class UploadProfilePic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setImage: "https://www.security-camera-warehouse.com/images/profile.png"

        };
    }

    doUpload() {
        axios.post('/upload', formData).then((resp) => {
            this.props.setImage(resp.data.imageUrl)
        })
    }

    render() {

        return (
            <div>
                <input type = "file" onChange = {this.doUpload} />
                {/*<img src = { this.state.setImage }  />*/}
            </div>
        )

    }

}
