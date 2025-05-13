import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
};

const LoginForm: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user types
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!isLogin) {
            if (!formData.username) {
                newErrors.username = 'Username is required';
            }
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', formData);
            // Here you would typically call your authentication API
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        // Clear form and errors when toggling
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
        setErrors({});
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.formContainer} ${isLogin ? styles.login : styles.signup}`}>
                <div className={styles.toggleContainer}>
                    <div className={`${styles.toggle} ${isLogin ? '' : styles.active}`}>
                        <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
                            <h1>Регистрация</h1>
                            <p>У нас много трусов!</p>
                            <p>У меня уже есть аккаунт</p>
                            <button
                                className={styles.hidden}
                                id="login"
                                onClick={toggleForm}
                            >
                                Войти
                            </button>
                        </div>
                        <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
                            <h1>С возвращением</h1>
                            <p>Все вводи и скорее заходи, трусы не ждут!!</p>
                            <p>Еще не зарегистрирован?</p>
                            <button
                                className={styles.hidden}
                                id="register"
                                onClick={toggleForm}
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.formContent}>
                    <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={errors.username ? styles.error : ''}
                                />
                                {errors.username && <span className={styles.errorMessage}>{errors.username}</span>}
                            </div>
                        )}

                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? styles.error : ''}
                            />
                            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? styles.error : ''}
                            />
                            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
                        </div>

                        {!isLogin && (
                            <div className={styles.inputGroup}>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={errors.confirmPassword ? styles.error : ''}
                                />
                                {errors.confirmPassword && (
                                    <span className={styles.errorMessage}>{errors.confirmPassword}</span>
                                )}
                            </div>
                        )}

                        {isLogin && (
                            <div>
                                <div className={styles.options}>
                                    <label>
                                        <input type="checkbox" />
                                        Remember me
                                    </label>
                                    <br />

                                </div>
                                <button className={styles.forgot} type="button" >Forgot password?</button>
                            </div>
                        )}

                        <button type="submit" className={styles.submitBtn}>
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <div className={styles.socialIcons}>
                        <button type="button" className={styles.icon} aria-label="Login with Facebook">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </button>
                        <button type="button" className={styles.icon} aria-label="Login with Google">
                            <FontAwesomeIcon icon={faGoogle} />
                        </button>
                        <button type="button" className={styles.icon} aria-label="Login with LinkedIn">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;