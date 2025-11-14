import { ApiProperty } from '@nestjs/swagger';

export class LoginData {
    @ApiProperty({
        example: 'user@example.com',
        description: 'The email address of the user',
        required: true
    })
    email: string

    @ApiProperty({
        example: 'yourSecurePassword123',
        description: 'The password for the account',
        required: true,
        minLength: 8
    })
    password: string
}

export class LoginReturn {
    @ApiProperty({
        example: { id: 1, email: 'user@example.com', name: 'John Doe' },
        description: 'User data object'
    })
    data: any;

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT access token for authentication'
    })
    token: string;

    @ApiProperty({
        example: 'Login successful',
        description: 'Status message'
    })
    message: string;
}

export class SignUpData {
    @ApiProperty({
        example: 'John Doe',
        description: 'Full name of the user',
        required: true,
        minLength: 2
    })
    name: string

    @ApiProperty({
        example: 'user@example.com',
        description: 'Email address of the user',
        required: true,
        format: 'email'
    })
    email: string

    @ApiProperty({
        example: 'yourSecurePassword123',
        description: 'Password (minimum 8 characters, at least 1 letter and 1 number)',
        required: true,
        minLength: 8,
        pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'
    })
    password: string
}

export class SignUpReturn {
    @ApiProperty({
        example: { id: 1, email: 'user@example.com', name: 'John Doe' },
        description: 'Newly created user data'
    })
    data: any

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT access token for authentication'
    })
    token: string

    @ApiProperty({
        example: 'User registered successfully',
        description: 'Status message'
    })
    message: string
}