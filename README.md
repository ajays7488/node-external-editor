# External Editor
A node module to edit a string with a users preferred text editor using $VISUAL or $ENVIRONMENT.

Version: 0.0.1

##Install

`npm install external-editor --save`

##Usage

A simple example using the `.edit` convenience method

    var ExternalEditor = require('external-editor')
    var data = ExternalEditor.edit('\n\n# Please write your text above');
    console.log(data);
    
A full featured example

    var ExternalEditor = require('external-editor');
    
    try {
        var editor = new ExternalEditor();
        editor.run()
        // the data is now available in editor.data
        
        // eventually call the cleanup to remove the temporary file
        editor.cleanup()
    } catch (error) {
        if (error instanceOf ExternalEditor.CreateFileError)
            console.log('Failed to create the temporary file');
        else if (error instanceOf ExternalEditor.ReadFileError)
            console.log('Failed to read the temporary file');
        else if (error instanceOf ExternalEditor.RemoveFileError)
            console.log('Failed to remove the temporary file');
        else if (error instanceOf ExternalEditor.LaunchEditorError)
            console.log('Failed to launch your editor');
        
    }
    
    
####API
**Static Methods**
- `edit(text)`
    - `text` (string) *Optional* Defaults to ''
    - **Returns** (string) The contents of the file
    - Could throw `CreateFileError`, `ReadFileError`, or `LaunchEditorError`, or `RemoveFileError`

**Static Properties**
- `CreateFileError` Error thrown if the temporary file could not be created. 
- `ReadFileError` Error thrown if the temporary file could not be read.
- `RemoveFileError` Error thrown if the temporary file could not be removed during cleanup.
- `LaunchEditorError` Error thrown if the editor could not be launched.

**Public Methods**
- `new ExternalEditor(text)`
    - `text` (string) *Optional* Defaults to ''
    - Could throw `CreateFileError`
- `run()` Launches the editor.
    - **Returns** (string) The contents of the file
    - Could throw `LaunchEditorError` or `ReadFileError` 
- `cleanup()`  Removes the temporary file.
    - Could throw `RemoveFileError`
    
**Public Properties**
- `text` (string) *readonly* The text in the temporary file.
- `editor.bin` (string) The editor determined from the environment. Can be overridden.
- `editor.args` (array) Default arguments for the bin
- `temp_file` (string) Path to temporary file. Can be changed, but be careful as the temporary file probably already 
    exists
    
##Why Synchronous?
 
Everything is synchronous to make sure the editor has complete control of the stdin and stdout. Testing has shown 
async launching of the editor can lead to issues when using readline or other packages which try to read from stdin or 
write to stdout. Seeing as this will be used in an interactive CLI environment, I made the decision to force the package
to be synchronous. If you know a reliable way to force all stdin and stdout to be limited only to the child_process,
please submit a PR.
    
##License

The MIT License (MIT)

Copyright (c) 2016 Kevin Gravier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
