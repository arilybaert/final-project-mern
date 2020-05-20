import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import { Navbar } from '../components'

const UploadPage = ({children}) => {

    return (
        <div>
            <Navbar/>  
        
        <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Info</label>
                <input type="email" className="form-control" id="info" placeholder="info"></input>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Image</label>
                <input type="file" className="form-control" id="file"></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}

export default UploadPage;