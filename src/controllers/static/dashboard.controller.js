export async function dashboardPage(req, res) {
    try {
        console.log(req)
        console.log(res)
        res.render('dashboard', { msg: 'Welcome to s3b' });
    } catch (error) {
        console.log(error)
    }
}