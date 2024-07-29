Com este repositório, demonstro como utilizar o Playwright para autenticar-se em um site que utiliza autenticação do Google com 2FA através de um arquivo `auth.setup`, salvando o estado do navegador para que todos os testes possam iniciar com um estado já autenticado.

📚 **Biblioteca 2FA:** otpauth

🔧 **Para executar os testes:**

1. Crie um arquivo `.env` com as seguintes variáveis:

    ```plaintext
    BASE_URL=https://www.tanyaaja.in
    GOOGLE_EMAIL=
    GOOGLE_PASSWORD=
    GOOGLE_OTP_SECRET=
    ```

    - `GOOGLE_EMAIL` e `GOOGLE_PASSWORD` são o e-mail e a senha da sua conta do Google. Não incluí um arquivo `.env` neste repositório para manter suas senhas e segredos de OTP privados. No entanto, há um arquivo `.env.example` que pode ser renomeado para `.env` e preenchido com suas informações.

2. Obtenha o `GOOGLE_OTP_SECRET`:

    - Se você tiver um aplicativo de autenticação do Google em seu telefone, siga o processo de exportação para obter o segredo. Durante a exportação, você verá um código QR que pode ser lido com um leitor de QR code com o formato:

    ```plaintext
    QR-Code:otpauth://totp/Google%3A{email}?secret={secret}&issuer=Google
    ```

3. Para rodar os testes, execute os seguintes comandos:

    ```bash
    npm install
    npx playwright install
    npx playwright test
    ```
