import React from "react";
import axios from "./axios";
import App from "./app";


export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: ""
        };
        this.upload  = this.upload.bind(this);
    }
    upload(a) {
        console.log("Upload here");
        axios.post("/upload", a).then(({ data }) => {
            console.log("data in upload", data);
            this.props.setImage(data.urlConc);
        });
    }


    render() {
        console.log(this.state);
        return (
            <div className="uploadmodule2">

                <label className="uploadmodule" htmlFor="Upload"></label>

                <input name="file" type="file" id="file"
                    onChange={e => {
                        const data = new FormData();
                        data.append("file", e.target.files[0]);
                        console.log('data: ', data);
                        this.upload(data);
                    }}
                />

            </div>
        );
    }
}
