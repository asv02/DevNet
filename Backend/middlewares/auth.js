
const adminAuth = (req,res,next)=>
    {
        console.log('admin Auth....')

        const token = 'yz';
        const isAdmin = token === 'xyz';
        if(isAdmin)
            {
                next()
            }
        else
        {
            res.status(401).send('Unauthorized request...')
        }
    }

module.exports = 
{
    adminAuth
}