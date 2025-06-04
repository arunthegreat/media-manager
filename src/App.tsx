import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [file, setFile] = useState<File | null>(null);

  const API_ENDPOINT = "https://llvzdkhno1.execute-api.eu-west-2.amazonaws.com/dev/upload";

  function getPresignUrlPromiseFunction(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        axios.post(API_ENDPOINT, { 'key': file?.name }).then((response) => {
          resolve(response.data);
        })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        return reject(error);
      }
    });
  }

  const handleUpload = async () => {
    const presignedPostData = await getPresignUrlPromiseFunction();
    if (presignedPostData.url) {
      console.log(presignedPostData);
      const formData = new FormData();

      // append the fields in presignedPostData in formData            
      Object.keys(presignedPostData.fields).forEach(key => {
        key !== 'acl' && formData.append(key, presignedPostData.fields[key]);
      });

      formData.append('file', file!);

      await axios.post(presignedPostData.url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        console.log(response);
      })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className= "d-flex justify-content-center align-items-center" >
    <Form>
    <Card>
    <Card.Header>Upload Song </Card.Header>
      < Card.Body >
      <Card.Title>Select your song to upload </Card.Title>
        < Form.Group controlId = "formFile" className = "mb-3" >
          <Form.Label>Default file input example </Form.Label>
            < Form.Control type = "file" accept = "audio/*" onChange = { (e) => {
    const target = e.target as HTMLInputElement;
    setFile((target.files as FileList)[0]);
  }
}/>
  </Form.Group>
  < Button variant = "primary" onClick = { handleUpload } > Upload Song </Button>
    </Card.Body>
    </Card>
    </Form>
    </div>
  )
}

export default App
