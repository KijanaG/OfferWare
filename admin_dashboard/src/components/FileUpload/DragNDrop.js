import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled, { css } from "styled-components";
import {Button} from 'semantic-ui-react'

function DragNDrop(props) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: file => props.onLoad(file, props.type)
    });

    const files = acceptedFiles.map(file => (
        <li style={{ margin: 0 }} key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));

    return (
        <section style={{ margin: 0, padding: 0 }} className="container">
            <FileDrop {...getRootProps()}>
                <P>Upload Photo</P>
                <input {...getInputProps()} />
            </FileDrop>
            <div>{files}</div>
        </section>
    )
}

export default DragNDrop;

const FileDrop = styled.div`
vertical-align: top;
width: 20vw;
height: 6vh;
background-color: rgba(249,249,249,1);
border-radius: 9px;
border-color: rgba(177,219,255,1);
border-width: 2px;
border-style: solid;
display: block;
padding-left: 0.7vw;
font-size: 1.4vmin;
color: grey;
font-weight: 500;
margin: 0;
::placeholder,
::-webkit-input-placeholder {
  color: rgba(180,180,180,0.8);
  font-size: 1.4vmin;
};
`;

const P = styled.h4`
  margin-top:5px;
`;