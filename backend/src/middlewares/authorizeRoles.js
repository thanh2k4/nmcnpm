
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role) || (req.params.id !== req.user.id)) {
            return res.status(403).json({ message: 'You are not authorized' });
        }
        next();
    }
}

module.exports = { authorizeRoles };  