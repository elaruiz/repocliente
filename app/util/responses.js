
export const ErrorMsg = (req, res, source, error) =>{
    error.output.payload.message = error.output.payload.message.split('[')[1].split(']')[0].split('" ')[1];
    return error
}