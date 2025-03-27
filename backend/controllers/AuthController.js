class AuthController {
  constructor(authService) {
    this.authService = authService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.getMe = this.getMe.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.logout = this.logout.bind(this);
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
