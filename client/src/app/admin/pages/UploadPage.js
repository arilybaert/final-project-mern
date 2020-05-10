import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import { Navbar } from '../components'

const UploadPage = ({children}) => {

    return (
        <div>
            <Navbar/>  
        
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Info</label>
                <input type="email" class="form-control" id="info" placeholder="info"></input>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Image</label>
                <input type="file" class="form-control" id="file"></input>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}

export default UploadPage;