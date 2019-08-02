module.exports = {
    configureWebpack: {
        devServer: {
            before(app) {
               app.get('/api/goods', function(req,res){
                    res.json({
                        code:0,
                        list: [
                            { id: 1, text: "Web全栈架构师", price: 1000 },
                            { id: 2, text: "Python架构师", price: 1000 }
                        ]
                    })
               }) 
            }
        }
    }
}