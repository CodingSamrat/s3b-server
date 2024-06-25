

// =================================================================================
// Name         : homePage
// Description  : Home Page. Get start page
// Method       : POST
// Route        : /
// Access       : public
// =================================================================================
export async function homePage(req, res) {
    try {
        res.render('index', { foo: 'FOO' });
    } catch (error) {
        console.log(error)
    }
}