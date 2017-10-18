
export const ErrorMsg = (error) =>{
    const pattern = /^.*?\["(.+)"\s(.+)\]$/;
    const regexp = new RegExp(pattern,'g');
    // error.output.payload.message = error.output.payload.message.split('[')[1].split(']')[0].split('" ')[1];
    error.output.payload.message = error.output.payload.message.replace(regexp, '$2');
    return error;
};