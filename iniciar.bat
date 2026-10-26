@echo off
title COMBAT HUB - Modelo para Academias de Luta
echo ========================================================
echo       COMBAT HUB - MODELO WHITE-LABEL PARA ACADEMIAS
echo ========================================================
echo.
echo [1/3] Iniciando Servidor Backend (API)...
start "Backend - Combat Hub" cmd /k "cd /d "%~dp0backend" && npm run dev"

echo [2/3] Iniciando Servidor Frontend (Web)...
start "Frontend - Combat Hub" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo [3/3] Aguardando inicializacao dos servidores (4 segundos)...
timeout /t 4 /nobreak > nul

echo.
echo Abrindo o site no seu navegador padrao: http://localhost:5173
start http://localhost:5173

echo.
echo ========================================================
echo   ACESSO AO SISTEMA:
echo   - Site / Landing Page: http://localhost:5173
echo   - Painel do Aluno:     http://localhost:5173/portal
echo   - Painel de Gestao:    http://localhost:5173/admin
echo.
echo   CREDENCIAS DO ADMINISTRADOR:
echo   Acesso: BrgAdmin (ou admin@academia.com)
echo   Senha:  CentroDeCombateModelTotallity984490@!
echo ========================================================
echo.
