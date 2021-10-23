const throwFlagMissing = (args, flags) => {
    let message = "Failed. Missing flags: ";
    let missing = false;
    let first = true;

    flags.forEach((flag) => {
        if (!args[flag]) {
            if (first) {
                first = false;
            } else {
                message += ", "; 
            }
            message += flag;
            missing = true;
        }
    });

    if (missing) {
        throw new Error(message);
    } else {
        return;
    }
}   

export {
    throwFlagMissing
}