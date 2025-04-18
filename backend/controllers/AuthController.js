class AuthController {
    constructor(authService) {
        this.authService = authService;

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.getMe = this.getMe.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.logout = this.logout.bind(this);
    }

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const result = await this.authService.forgotPassword(email);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            const result = await this.authService.resetPassword(
                token,
                newPassword
            );
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async register(req, res) {
        try {
            const { firstName, lastName, email, password } = req.body;
            const result = await this.authService.register(
                firstName,
                lastName,
                email,
                password
            );
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !email.includes('@')) {
                return res.status(400).json({ error: "Valid email is required" });
            }
            const result = await this.authService.login(email, password);

            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getMe(req, res) {
        try {
            const user = await this.authService.getMe(req.userId);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateProfile(req, res) {
        try {
            const { firstName, lastName } = req.body;
            const result = await this.authService.updateProfile(
                req.userId,
                firstName,
                lastName
            );
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteAccount(req, res) {
        try {
            const result = await this.authService.deleteAccount(req.userId);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    logout(req, res) {
        res.json({ message: "Logged out" });
    }
}

module.exports = AuthController;
