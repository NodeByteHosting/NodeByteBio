# Security Policy

## Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 3.x.x   | :white_check_mark: |
| < 3.0   | :x:                |

## Reporting a Vulnerability

We take the security of NodeByte Links seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please DO NOT

- Open a public GitHub issue for security vulnerabilities
- Disclose the vulnerability publicly before it has been addressed
- Exploit the vulnerability beyond what is necessary to demonstrate it

### Please DO

1. **Email us directly** at [security@nodebyte.host](mailto:security@nodebyte.host)
2. **Provide detailed information** including:
   - Type of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
3. **Allow reasonable time** for us to respond and address the issue

### What to Include in Your Report

```
Subject: [SECURITY] Brief description of vulnerability

1. Vulnerability Type:
   (e.g., XSS, CSRF, Information Disclosure, etc.)

2. Affected Component:
   (e.g., Settings Modal, Status API, Theme System)

3. Steps to Reproduce:
   1. Step one
   2. Step two
   3. ...

4. Impact Assessment:
   (What could an attacker potentially do?)

5. Proof of Concept:
   (Code, screenshots, or video if applicable)

6. Suggested Remediation:
   (Optional - your recommended fix)

7. Your Contact Information:
   (How we can reach you for follow-up)
```

## Response Timeline

| Action | Timeline |
|--------|----------|
| Initial Response | Within 48 hours |
| Status Update | Within 7 days |
| Fix Development | Depends on severity |
| Public Disclosure | After fix is deployed |

## Severity Classification

### Critical
- Remote code execution
- Authentication bypass
- Data breach potential

**Response**: Immediate priority, fix within 24-48 hours

### High
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Privilege escalation

**Response**: High priority, fix within 7 days

### Medium
- Information disclosure
- Session management issues
- Missing security headers

**Response**: Standard priority, fix within 30 days

### Low
- Minor information leaks
- Non-sensitive configuration exposure
- Best practice violations

**Response**: Scheduled for next release

## Security Best Practices

### For Users

1. **Keep your browser updated** to the latest version
2. **Use HTTPS** when accessing the site
3. **Report suspicious activity** immediately

### For Contributors

1. **Never commit secrets** (API keys, credentials, etc.)
2. **Validate all inputs** in any new code
3. **Use parameterized queries** for any database operations
4. **Follow the principle of least privilege**
5. **Keep dependencies updated** and audit regularly

## Security Features

NodeByte Links implements the following security measures:

### Client-Side
- Content Security Policy (CSP) headers
- XSS protection via React's built-in escaping
- Secure cookie handling for themes
- No sensitive data stored in localStorage

### API Routes
- Rate limiting on status API
- Proper error handling without information leakage
- CORS configuration

### Infrastructure
- HTTPS enforcement
- Security headers via Next.js config
- Regular dependency audits

## Acknowledgments

We appreciate the security research community's efforts in helping keep NodeByte Links secure. Researchers who report valid security issues will be:

- Credited in our security acknowledgments (with permission)
- Thanked publicly (with permission)
- Considered for our bug bounty program (when available)

## Contact

- **Security Email**: [security@nodebyte.host](mailto:security@nodebyte.host)
- **General Support**: [support@nodebyte.host](mailto:support@nodebyte.host)
- **Discord**: [discord.gg/nodebyte](https://discord.gg/nodebyte)

## Changes to This Policy

We may update this security policy from time to time. Changes will be reflected in this document with an updated revision date.

---

**Last Updated**: December 2024

Thank you for helping keep NodeByte Links and our users safe! 🔒
