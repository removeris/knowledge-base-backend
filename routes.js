module.exports = (app, upload, fs) => {
    
    // Create Article

    app.post("/api/articles", upload.single("file"), (req, res) => {
        
        const { title, content } = req.body;

        const article = {
            title: title.replaceAll(" ", "-"),
            content,
            createdAt: new Date().toLocaleDateString()
        };

    
        const fileName = `${article.title}.json`;
        const fileContent = JSON.stringify(article, null, 2);
    
        fs.writeFile(`./saved_articles/${fileName}`, fileContent, () => {
            console.log("Article saved locally:", fileName);
            res.status(201).json({ message: "Article saved successfully", article });
        });
    });

    app.post("/api/upload", upload.single("file"), (req, res) => {

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

        console.log(imageUrl);

        res.status(200).json({ imageUrl });
    });

    // Get Article

    app.get("/api/articles/:id", (req, res) => {

        fs.readFile(`./saved_articles/${req.params.id}.json`, 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }

            const article = JSON.parse(data);
            res.json(article);
        });
    });

    app.post("/api/search", (req, res) => {

        const { text } = req.body;

        let searchQuery = text.toLowerCase().split(' ');

        let files = fs.readdirSync('./saved_articles');

        let selectedItems = files.filter((file) => { 
            file = file.slice(0, -5).split('-').toString().replaceAll(',', ' ');

            let isSubstring = false;

            searchQuery.forEach(word => {

                if(file.toLowerCase().includes(word)) {
                    isSubstring = true;
                }
            });

            if(isSubstring) {
                return file;
            }
        });

        res.status(200).json( { selectedItems });
    });

    app.post('/login', (req, res) => {

        const { username, password} = req.body;
        const predefinedUser = { username: 'myTU2024userKB', password: '9:x+l4U".!3I"?Ze8' };

        console.log(username + password);

        const crypto = require('crypto');
        const token = crypto.randomBytes(64).toString('hex');

        if (username === predefinedUser.username && password === predefinedUser.password) {
            res.json({ token });
          } else {
            res.status(401).json({ error: 'Invalid credentials' });
          }
    });
}