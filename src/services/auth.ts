interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class AuthService {
  private static readonly USERS_KEY = 'auth_users';
  private static readonly CURRENT_USER_KEY = 'auth_current_user';

  static getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  static getCurrentUser(): User | null {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  static register(name: string, email: string, password: string): { success: boolean; error?: string } {
    const users = this.getUsers();
    
    if (users.some(user => user.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password, // In a real app, this should be hashed
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return { success: true };
  }

  static login(email: string, password: string): { success: boolean; error?: string } {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    return { success: true };
  }

  static logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }
}