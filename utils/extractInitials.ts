export const extractInitials = (fullName: string) => {
    const nameParts = fullName.split(" ");
    let initials = "";
    nameParts.forEach((part) => {
        initials += part[0];
    });
    return initials;
}