/**
 * * Public Routes *
 * Эти маршруты доступны всем пользователям, независимо от их статуса аутентификации.
 * Обычно включают страницы, доступные без входа в систему.
 */
export const publicRoutes = ['/', '/auth/new-verefication'];

/**
 * * Authentication Routes *
 * Эти маршруты используются для страниц входа и регистрации.
 * Обычно доступны только неаутентифицированным пользователям.
 */
export const authRoutes = ['/auth/login', '/auth/register', '/auth/error'];

/**
 * * API Authentication Prefix *
 * Префикс для группировки всех API-эндпоинтов, связанных с аутентификацией.
 * Включает в себя логику входа, выхода, проверки статуса сессии и т.д.
 */
export const apiAuthPrefix = '/api/auth';

/**
 * * Default Login Redirect URL *
 * URL для перенаправления пользователя после успешной аутентификации.
 * Определяет, куда пользователя следует направить после входа в систему.
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
