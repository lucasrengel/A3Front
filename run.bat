@echo off
title A3Front - Sistema de Estoque
echo ==========================================
echo      Iniciando A3Front (Frontend)
echo ==========================================

:: Verifica se o Node.js esta instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Por favor, instale o Node.js para executar este projeto.
    echo Baixe em: https://nodejs.org/
    pause
    exit /b
)

cd /d "%~dp0"

:: Verifica se as dependencias estao instaladas
if not exist "node_modules" (
    echo [INFO] Pasta node_modules nao encontrada. Instalando dependencias...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERRO] Falha ao instalar dependencias.
        pause
        exit /b
    )
)

echo.
echo [INFO] Iniciando servidor...
call npm run dev
