const DataUriParser=require('datauri/parser.js')
const path=require('path')


const getDataurl=(file)=>{

    const parser=new DataUriParser();

    const ExtName=path.extname(file.originalname).toString()

    return parser.format(ExtName,file.buffer)
}

module.exports=getDataurl