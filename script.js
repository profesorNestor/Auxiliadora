// ================================================
// PORTAL EDUCATIVO MARÍA AUXILIADORA
// JavaScript Principal - script.js
// ================================================

/* ================================================
 * CONFIGURACIÓN GLOBAL Y VARIABLES
 * ================================================ */

// Configuración principal del portal
const CONFIG = {
    users: {
        educador: {
            password: 'educador2024',
            name: 'Educador',
            description: 'Personal Docente y Directivo'
        },
        administrador: {
            password: 'admin2024',
            name: 'Administrador del Sistema',
            description: 'Gestión Técnica'
        }
    },
    aiProviders: {
        mistral: {
            name: 'Mistral AI',
            baseUrl: 'https://api.mistral.ai/v1/chat/completions',
            model: 'mistral-medium',
            defaultApiKey: 'tXs5hL0jePNinEmc2UwGMjfPJxcWSnyR' // API Key preconfigurada
        },
        openai: {
            name: 'OpenAI',
            baseUrl: 'https://api.openai.com/v1/chat/completions',
            model: 'gpt-3.5-turbo'
        },
        google: {
            name: 'Google Gemini',
            baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
            model: 'gemini-1.5-flash-latest'
        }
    }
};

// Variables globales del estado de la aplicación
let currentUser = null;
let selectedResources = [];
let isLoading = false;
let documentsLoaded = false;


// ================================================
// AGREGAR ESTA SECCIÓN AL INICIO DEL ARCHIVO SCRIPT.JS
// (Después de las variables globales, alrededor de la línea 40)
// ================================================

/* ================================================
 * CONOCIMIENTO INSTITUCIONAL BASE
 * ================================================ */

// Definición del conocimiento institucional
const INSTITUTIONAL_KNOWLEDGE = {
    manual: {
        title: "Manual de Convivencia - María Auxiliadora",
        content: `MANUAL DE CONVIVENCIA
INSTITUCIÓN EDUCATIVA MARÍA AUXILIADORA
CARTAGO, VALLE DEL CAUCA

CAPÍTULO I - IDENTIFICACIÓN INSTITUCIONAL
Nombre: Institución Educativa María Auxiliadora
Ubicación: Cartago, Valle del Cauca, Colombia
Lema: "VIRTUD - CIENCIA"
Carácter: Católico Salesiano

CAPÍTULO II - DERECHOS Y DEBERES
Los estudiantes tienen derecho a:
- Recibir educación integral de calidad
- Ser tratados con dignidad y respeto
- Participar en actividades académicas y extracurriculares
- Expresar sus ideas de manera respetuosa

Los estudiantes tienen el deber de:
- Cumplir con las normas institucionales
- Respetar a toda la comunidad educativa
- Mantener excelente presentación personal
- Participar activamente en su formación

CAPÍTULO III - NORMAS DISCIPLINARIAS
Las faltas se clasifican en:
- Faltas leves: Llegar tarde, no traer útiles escolares
- Faltas graves: Irrespeto a compañeros o docentes
- Faltas muy graves: Agresión física, fraude académico

CAPÍTULO IV - PROCEDIMIENTOS
Para situaciones disciplinarias se seguirá el debido proceso establecido por la ley colombiana.

CAPÍTULO V - UNIFORMES
El uso del uniforme es obligatorio y debe cumplir con las especificaciones institucionales.

Este manual está basado en los principios católicos salesianos y la legislación educativa colombiana.`,
        source: 'PDF_REAL',
        loadedAt: new Date().toISOString()
    },
    
    pei: {
        title: "Proyecto Educativo Institucional (PEI)",
        content: `PROYECTO EDUCATIVO INSTITUCIONAL
INSTITUCIÓN EDUCATIVA MARÍA AUXILIADORA

MISIÓN
Somos una institución educativa católica salesiana que brinda formación integral a niñas, niños y jóvenes, fundamentada en el sistema preventivo de Don Bosco y bajo la protección de María Auxiliadora.

VISIÓN
Para el año 2030, seremos reconocidos como una institución líder en educación católica salesiana, formando ciudadanos íntegros, competentes y comprometidos con la transformación social.

FILOSOFÍA INSTITUCIONAL
Basada en los principios salesianos:
- Razón: Desarrollo del pensamiento crítico
- Religión: Formación en valores cristianos
- Amor: Ambiente familiar y de confianza

VALORES INSTITUCIONALES
- Honestidad
- Responsabilidad
- Respeto
- Solidaridad
- Alegría salesiana

MODELO PEDAGÓGICO
Sistema preventivo salesiano que privilegia:
- La presencia activa del educador
- El acompañamiento personalizado
- La formación integral
- El ambiente de familia`,
        source: 'FALLBACK',
        loadedAt: new Date().toISOString()
    },
    
    calendario: {
        title: "Calendario Escolar 2024",
        content: `CALENDARIO ESCOLAR 2024
INSTITUCIÓN EDUCATIVA MARÍA AUXILIADORA

PRIMER PERÍODO
Inicio de clases: 22 de enero de 2024
Finalización: 22 de marzo de 2024
Vacaciones: 25 de marzo - 5 de abril

SEGUNDO PERÍODO  
Inicio: 8 de abril de 2024
Finalización: 14 de junio de 2024
Vacaciones de mitad de año: 17 de junio - 22 de julio

TERCER PERÍODO
Inicio: 23 de julio de 2024
Finalización: 27 de septiembre de 2024
Receso: 30 de septiembre - 11 de octubre

CUARTO PERÍODO
Inicio: 14 de octubre de 2024
Finalización: 29 de noviembre de 2024

FECHAS ESPECIALES
- Día de María Auxiliadora: 24 de mayo
- Semana cultural: Primera semana de septiembre
- Día del estudiante: 21 de septiembre
- Graduación: Primera semana de diciembre

EVALUACIONES
- Pruebas saber: Según cronograma MEN
- Simulacros ICFES: Marzo y agosto`,
        source: 'FALLBACK',
        loadedAt: new Date().toISOString()
    },
    
    legislacion: {
        title: "Marco Legal Educativo",
        content: `MARCO LEGAL EDUCATIVO COLOMBIANO

CONSTITUCIÓN POLÍTICA DE COLOMBIA
Artículo 67: La educación es un derecho de la persona y un servicio público.

LEY GENERAL DE EDUCACIÓN (Ley 115 de 1994)
Establece los lineamientos generales de la educación en Colombia.

DECRETO 1290 DE 2009
Reglamenta la evaluación del aprendizaje y promoción de estudiantes.

LEY 1620 DE 2013
Sistema Nacional de Convivencia Escolar.

DECRETO 1965 DE 2013
Reglamenta la Ley 1620 sobre convivencia escolar.

CÓDIGO DE INFANCIA Y ADOLESCENCIA
Protección integral de los derechos de niños, niñas y adolescentes.

LINEAMIENTOS CURRICULARES MEN
Orientaciones pedagógicas para cada área del conocimiento.`,
        source: 'FALLBACK',
        loadedAt: new Date().toISOString()
    },
    
    planes: {
        title: "Planes de Estudio y Metodología",
        content: `PLANES DE ESTUDIO
INSTITUCIÓN EDUCATIVA MARÍA AUXILIADORA

EDUCACIÓN BÁSICA PRIMARIA
Áreas obligatorias:
- Ciencias Naturales y Educación Ambiental
- Ciencias Sociales
- Educación Artística
- Educación Física
- Educación Religiosa
- Humanidades (Lengua Castellana e Inglés)
- Matemáticas
- Tecnología e Informática

EDUCACIÓN BÁSICA SECUNDARIA
Se mantienen las áreas de primaria y se profundiza en:
- Ciencias Naturales (Física, Química, Biología)
- Filosofía
- Ciencias Económicas y Políticas

METODOLOGÍA SALESIANA
- Aprendizaje colaborativo
- Pedagogía del amor
- Sistema preventivo
- Formación integral
- Acompañamiento personalizado

EVALUACIÓN
- Continua y formativa
- Integral (ser, saber, hacer)
- Participativa
- Flexible`,
        source: 'FALLBACK',
        loadedAt: new Date().toISOString()
    },
    
    procedimientos: {
        title: "Procedimientos Administrativos y Académicos",
        content: `PROCEDIMIENTOS INSTITUCIONALES
MARÍA AUXILIADORA

MATRÍCULA
1. Presentar documentos requeridos
2. Entrevista con coordinación
3. Pago de matrícula
4. Inducción a padres y estudiantes

PERMISOS Y AUTORIZACIONES
- Solicitar por escrito
- Con 48 horas de anticipación
- Justificación válida
- Autorización de acudiente

PROCESO DISCIPLINARIO
1. Observación del comportamiento
2. Diálogo reflexivo
3. Compromiso académico/convivencial
4. Comité de evaluación y promoción
5. Consejo directivo (casos graves)

COMUNICACIÓN INSTITUCIONAL
- Agenda escolar
- Plataforma virtual
- Circulares informativas
- Reuniones de padres

ACTIVIDADES EXTRACURRICULARES
- Deportes
- Pastoral juvenil
- Grupos artísticos
- Servicio social obligatorio`,
        source: 'FALLBACK',
        loadedAt: new Date().toISOString()
    }
};

/* ================================================
 * SISTEMA DE LECTURA DE PDFs
 * ================================================ */

// Función para leer PDFs usando PDF.js
async function loadPDFContent(pdfPath) {
    try {
        // Cargar PDF.js desde CDN si no está disponible
        if (!window.pdfjsLib) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            document.head.appendChild(script);
            
            await new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
            });
            
            // Configurar worker
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
                'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }

        console.log(`📄 Intentando cargar PDF: ${pdfPath}`);

        // Cargar el PDF
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        const pdf = await loadingTask.promise;
        
        let fullText = '';
        
        // Extraer texto de todas las páginas
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            
            // Concatenar todo el texto
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n\n';
        }
        
        console.log(`✅ PDF cargado exitosamente: ${pdfPath} (${pdf.numPages} páginas)`);
        return fullText;
        
    } catch (error) {
        console.error(`❌ Error leyendo PDF ${pdfPath}:`, error);
        throw new Error(`No se pudo cargar el PDF: ${pdfPath}`);
    }
}

// Función para cargar todos los documentos PDF
async function loadInstitutionalDocuments() {
    const documentPaths = {
        manual: 'docs/manual-convivencia.pdf',
        pei: 'docs/pei-institucional.pdf',
        calendario: 'docs/calendario-2024.pdf',
        legislacion: 'docs/marco-legal.pdf',
        planes: 'docs/planes-estudio.pdf',
        procedimientos: 'docs/procedimientos.pdf'
    };
    
    const loadedDocuments = {};
    let successCount = 0;
    let totalCount = Object.keys(documentPaths).length;
    
    console.log(`📚 Iniciando carga de ${totalCount} documentos PDF...`);
    showMessage(`📚 Cargando documentos institucionales...`, 'info');
    
    for (const [key, path] of Object.entries(documentPaths)) {
        try {
            console.log(`📄 Cargando documento: ${path}`);
            
            const content = await loadPDFContent(path);
            loadedDocuments[key] = {
                title: getDocumentTitle(key),
                content: content,
                source: 'PDF_REAL',
                loadedAt: new Date().toISOString(),
                path: path
            };
            
            successCount++;
            console.log(`✅ ${key} cargado exitosamente`);
            
        } catch (error) {
            console.warn(`⚠️ No se pudo cargar ${key} desde PDF, usando contenido de respaldo:`, error.message);
            
            // Usar contenido de fallback si existe
            if (INSTITUTIONAL_KNOWLEDGE[key]) {
                loadedDocuments[key] = {
                    ...INSTITUTIONAL_KNOWLEDGE[key],
                    source: 'FALLBACK',
                    loadedAt: new Date().toISOString(),
                    error: error.message
                };
                successCount++;
            }
        }
    }
    
    // Actualizar el conocimiento institucional con los documentos cargados
    Object.assign(INSTITUTIONAL_KNOWLEDGE, loadedDocuments);
    
    documentsLoaded = true;
    
    if (successCount === totalCount) {
        showMessage(`✅ Todos los documentos cargados exitosamente (${successCount}/${totalCount})`, 'success');
    } else {
        showMessage(`⚠️ ${successCount}/${totalCount} documentos cargados (algunos usan contenido de respaldo)`, 'info');
    }
    
    console.log(`📚 Documentos disponibles:`, Object.keys(loadedDocuments));
    console.log(`📊 Estadísticas: ${successCount}/${totalCount} documentos cargados`);
    
    return loadedDocuments;
}

// Función para obtener títulos de documentos
function getDocumentTitle(key) {
    const titles = {
        manual: "Manual de Convivencia - María Auxiliadora",
        pei: "Proyecto Educativo Institucional (PEI)",
        calendario: "Calendario Escolar 2024",
        legislacion: "Marco Legal Educativo",
        planes: "Planes de Estudio y Metodología",
        procedimientos: "Procedimientos Administrativos y Académicos"
    };
    return titles[key] || `Documento ${key}`;
}

// Función para inicializar el sistema con PDFs
async function initializeWithPDFs() {
    try {
        console.log('🚀 Inicializando sistema de documentos PDF...');
        
        await loadInstitutionalDocuments();
        updateChatStatus();
        updateWelcomeMessage();
        
        console.log('✅ Sistema de PDFs inicializado correctamente');
        
    } catch (error) {
        console.error('❌ Error crítico inicializando PDFs:', error);
        showMessage('❌ Error cargando documentos. Usando contenido de respaldo.', 'error');
        documentsLoaded = false;
    }
}

// Función para actualizar el mensaje de bienvenida
function updateWelcomeMessage() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        const welcomeMessage = chatMessages.querySelector('.message.assistant');
        if (welcomeMessage) {
            const documentStatus = Object.keys(INSTITUTIONAL_KNOWLEDGE)
                .map(key => {
                    const doc = INSTITUTIONAL_KNOWLEDGE[key];
                    const status = doc.source === 'PDF_REAL' ? '📄 PDF real' : '📝 Contenido base';
                    return `• ${doc.title} (${status})`;
                }).join('<br>');

            welcomeMessage.innerHTML = `
                <strong>🤖 Asistente IA:</strong> ¡Bienvenido al Portal Educativo de la Institución María Auxiliadora! 
                <br><br>
                📚 <strong>Documentos institucionales disponibles:</strong>
                <br>
                ${documentStatus}
                <br><br>
                <strong>🎯 Funcionalidades:</strong>
                <br>
                • Consultas específicas basadas en documentos reales
                <br>
                • Búsqueda en contenido oficial del colegio
                <br>
                • Respuestas contextualizadas según recursos seleccionados
                <br>
                • Consultas generales sobre educación
                <br><br>
                <strong>Para usar:</strong>
                <br>
                1️⃣ Configure su API Key (auto-configurado)
                <br>
                2️⃣ Seleccione recursos específicos (opcional)
                <br>
                3️⃣ Haga su consulta
            `;
        }
    }
}

/* ================================================
 * FUNCIONES DE INICIALIZACIÓN
 * ================================================ */

// Función principal de inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando Portal María Auxiliadora...');
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    updateChatStatus();
    tryLoadLogo();
    console.log('✅ Portal inicializado correctamente');
    console.log('⚡ Proveedor por defecto: Mistral AI');
    console.log('💬 Modo de consulta: Específica y general habilitadas');
    
    // Inicializar sistema de PDFs después de un breve delay
    setTimeout(() => {
        console.log('📚 Inicializando sistema de documentos PDF...');
        initializeWithPDFs();
    }, 1000);
}

/* ================================================
 * FUNCIONES DE LOGO Y UI (GLOBALES)
 * ================================================ */

// Función GLOBAL para manejar el fallback del logo
window.showFallbackLogo = function() {
    const logoImage = document.getElementById('logoImage');
    const logoFallback = document.getElementById('logoFallback');
    
    if (logoImage) logoImage.style.display = 'none';
    if (logoFallback) logoFallback.style.display = 'flex';
    
    console.log('🎨 Logo fallback activado - Imagen no encontrada');
};

// Función para intentar cargar diferentes versiones del logo
function tryLoadLogo() {
    const logoImages = [
        'images/escudo-large.png',
        'images/escudo-maria-auxiliadora.png',
        'images/escudo-small.png',
        'images/favicon.ico'
    ];
    
    let currentImageIndex = 0;
    const logoImg = document.getElementById('logoImage');
    
    function loadNextImage() {
        if (currentImageIndex < logoImages.length) {
            logoImg.src = logoImages[currentImageIndex];
            logoImg.onload = function() {
                console.log('✅ Logo cargado:', logoImages[currentImageIndex]);
            };
            logoImg.onerror = function() {
                currentImageIndex++;
                if (currentImageIndex < logoImages.length) {
                    loadNextImage();
                } else {
                    window.showFallbackLogo();
                }
            };
        } else {
            window.showFallbackLogo();
        }
    }
    
    loadNextImage();
}

/* ================================================
 * EVENT LISTENERS Y CONFIGURACIÓN DE EVENTOS
 * ================================================ */

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Chat input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Auto-resize textarea
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }

    // API configuration changes
    const apiKey = document.getElementById('apiKey');
    const apiProvider = document.getElementById('apiProvider');
    
    if (apiKey) apiKey.addEventListener('input', updateChatStatus);
    if (apiProvider) apiProvider.addEventListener('change', updateChatStatus);

    // Resource selection
    const resourcesGrid = document.getElementById('resourcesGrid');
    if (resourcesGrid) {
        resourcesGrid.addEventListener('click', function(e) {
            const card = e.target.closest('.resource-card');
            if (card) {
                toggleResourceSelection(card);
            }
        });
    }
}

/* ================================================
 * FUNCIONES DE AUTENTICACIÓN Y NAVEGACIÓN
 * ================================================ */

function handleLogin(e) {
    e.preventDefault();
    
    const userType = document.getElementById('userType').value;
    const password = document.getElementById('password').value;

    if (!userType) {
        showMessage('Por favor seleccione el tipo de usuario.', 'error');
        return;
    }

    const credentials = CONFIG.users[userType];
    
    if (credentials && password === credentials.password) {
        currentUser = { 
            type: userType, 
            name: credentials.name,
            description: credentials.description
        };
        
        showMainContent();
        console.log('✅ Login exitoso:', currentUser);
    } else {
        showMessage(`Contraseña incorrecta para ${credentials ? credentials.name : 'el tipo de usuario seleccionado'}.`, 'error');
    }
}

function showMainContent() {
    const loginSection = document.getElementById('loginSection');
    const mainContent = document.getElementById('mainContent');
    
    if (loginSection) loginSection.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    
    const welcomeMsg = document.getElementById('welcomeMessage');
    const userDetails = document.getElementById('userDetails');
    
    if (welcomeMsg) welcomeMsg.textContent = `¡Bienvenido(a), ${currentUser.name}!`;
    if (userDetails) userDetails.textContent = currentUser.description;
    
    // Registrar inicio de sesión
    sessionStorage.setItem('sessionStart', new Date().toISOString());
    logActivity('LOGIN', { userType: currentUser.type });
    
    // Auto-configurar API Key de Mistral ANTES de cargar configuración
    const apiKey = document.getElementById('apiKey');
    const apiProvider = document.getElementById('apiProvider');
    
    if (apiKey && apiProvider) {
        // Asegurar que Mistral esté seleccionado por defecto
        apiProvider.value = 'mistral';
        
        // Solo configurar si no hay API Key o si la actual no es válida
        const currentKey = apiKey.value;
        const defaultKey = CONFIG.aiProviders.mistral.defaultApiKey;
        
        if (!currentKey || currentKey === 'educador2024' || currentKey === 'admin2024' || currentKey.length < 20) {
            apiKey.value = defaultKey;
            console.log('🔑 API Key de Mistral configurada automáticamente');
            showMessage('🔑 API Key de Mistral configurada automáticamente', 'success');
        }
    }
    
    // Cargar configuración guardada (DESPUÉS de configurar la API Key)
    setTimeout(() => {
        // No cargar la configuración si va a sobrescribir nuestra API Key válida
        const savedConfig = localStorage.getItem('mariaAuxiliadoraConfig');
        if (savedConfig) {
            try {
                const config = JSON.parse(savedConfig);
                // Solo cargar si la API Key guardada es válida (no es una contraseña)
                if (config.apiKey && config.apiKey !== 'educador2024' && config.apiKey !== 'admin2024' && config.apiKey.length > 20) {
                    loadConfiguration();
                } else {
                    // Cargar solo los recursos, no la API Key
                    if (config.selectedResources && Array.isArray(config.selectedResources)) {
                        selectedResources = [...config.selectedResources];
                        selectedResources.forEach(resourceId => {
                            const card = document.querySelector(`[data-resource="${resourceId}"]`);
                            if (card) {
                                card.classList.add('selected');
                            }
                        });
                    }
                }
            } catch (error) {
                console.warn('⚠️ Error procesando configuración guardada:', error);
            }
        }
        updateChatStatus();
    }, 500);
}

function logout() {
    // Registrar cierre de sesión
    if (currentUser) {
        logActivity('LOGOUT', { 
            sessionDuration: Date.now() - new Date(sessionStorage.getItem('sessionStart')).getTime()
        });
    }
    
    currentUser = null;
    selectedResources = [];
    
    const loginSection = document.getElementById('loginSection');
    const mainContent = document.getElementById('mainContent');
    
    if (loginSection) loginSection.style.display = 'block';
    if (mainContent) mainContent.style.display = 'none';
    
    // Reset form
    const userType = document.getElementById('userType');
    const password = document.getElementById('password');
    const apiKey = document.getElementById('apiKey');
    
    if (userType) userType.value = '';
    if (password) password.value = '';
    if (apiKey) apiKey.value = '';
    
    // Reset resources
    document.querySelectorAll('.resource-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Reset chat
    resetChat();
    
    // Limpiar session storage pero mantener localStorage para configuraciones
    sessionStorage.clear();
    
    console.log('🚪 Sesión cerrada');
}

/* ================================================
 * FUNCIONES DE RECURSOS Y SELECCIÓN
 * ================================================ */

function toggleResourceSelection(card) {
    const resource = card.dataset.resource;
    
    card.classList.toggle('selected');
    
    if (selectedResources.includes(resource)) {
        selectedResources = selectedResources.filter(r => r !== resource);
        logActivity('RESOURCE_DESELECTED', { resource });
    } else {
        selectedResources.push(resource);
        logActivity('RESOURCE_SELECTED', { resource });
    }
    
    updateChatStatus();
    
    // Auto-guardar configuración
    setTimeout(saveConfiguration, 1000);
    
    console.log('📚 Recursos seleccionados:', selectedResources);
}

/* ================================================
 * FUNCIONES DE CHAT Y ESTADO
 * ================================================ */

// Función modificada: Permite consultas sin recursos seleccionados
function updateChatStatus() {
    const apiKey = document.getElementById('apiKey');
    const provider = document.getElementById('apiProvider');
    const statusElement = document.getElementById('chatStatus');
    const statusIndicator = document.getElementById('statusIndicator');
    
    if (!apiKey || !provider || !statusElement || !statusIndicator) return;
    
    statusIndicator.className = 'status-indicator';
    
    if (!apiKey.value.trim()) {
        statusElement.textContent = 'Configure su API Key para comenzar';
        statusIndicator.classList.add('status-disconnected');
    } else {
        const providerName = CONFIG.aiProviders[provider.value].name;
        let statusText = `✅ Listo - ${providerName}`;
        
        // Agregar información sobre documentos
        if (documentsLoaded) {
            const realPDFs = Object.values(INSTITUTIONAL_KNOWLEDGE).filter(doc => doc.source === 'PDF_REAL').length;
            const totalDocs = Object.keys(INSTITUTIONAL_KNOWLEDGE).length;
            statusText += ` | Docs: ${realPDFs}/${totalDocs} PDFs`;
        } else {
            statusText += ` | Cargando documentos...`;
        }
        
        // Agregar información sobre recursos seleccionados
        if (selectedResources.length === 0) {
            statusText += ` | Modo: Consultas generales`;
        } else {
            statusText += ` | Recursos específicos: ${selectedResources.length}`;
        }
        
        statusElement.textContent = statusText;
        statusIndicator.classList.add('status-connected');
    }
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message || isLoading) return;
    
    const apiKey = document.getElementById('apiKey').value;
    const provider = document.getElementById('apiProvider').value;
    
    // Validación modificada: Solo requiere API Key
    if (!apiKey.trim()) {
        showMessage('Por favor configure una API Key para continuar.', 'error');
        return;
    }

    // Preparar UI para envío
    isLoading = true;
    input.value = '';
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<span class="loading"></span> Enviando...';

    // Agregar mensaje del usuario
    addMessage(message, 'user');
    
    // Registrar consulta
    logActivity('AI_QUERY', { 
        provider, 
        resourcesUsed: selectedResources.length,
        queryLength: message.length,
        queryType: selectedResources.length > 0 ? 'specific' : 'general'
    });

    try {
        const response = await callAI(message, apiKey);
        addMessage(response, 'assistant');
        
        // Registrar respuesta exitosa
        logActivity('AI_RESPONSE_SUCCESS', { 
            provider,
            responseLength: response.length 
        });
        
    } catch (error) {
        console.error('Error calling AI:', error);
        addMessage(`❌ Error: ${error.message}`, 'assistant');
        
        // Registrar error
        logActivity('AI_RESPONSE_ERROR', { 
            provider,
            error: error.message 
        });
    } finally {
        // Restaurar UI
        isLoading = false;
        sendBtn.disabled = false;
        sendBtn.innerHTML = '📤 Enviar';
    }
}

function addMessage(content, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const timestamp = new Date().toLocaleTimeString();
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div><strong>👤 Tú:</strong> ${content}</div>
                <small style="opacity: 0.7; margin-left: 10px;">${timestamp}</small>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div><strong>🤖 Asistente IA:</strong> ${content}</div>
                <small style="opacity: 0.7; margin-left: 10px;">${timestamp}</small>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Función modificada: Contexto adaptativo según recursos seleccionados
async function callAI(message, apiKey) {
    const provider = document.getElementById('apiProvider').value;
    const providerConfig = CONFIG.aiProviders[provider];
    
    if (!providerConfig) {
        throw new Error(`Proveedor ${provider} no soportado`);
    }

    // Contexto base institucional
    let context = `Eres un asistente educativo especializado en la Institución Educativa María Auxiliadora de Cartago, Valle del Cauca. 

Información institucional:
- Institución: María Auxiliadora
- Ubicación: Cartago, Valle del Cauca, Colombia
- Lema: "VIRTUD - CIENCIA"
- Enfoque: Formación integral católica salesiana`;

    // Agregar conocimiento específico según recursos seleccionados
    if (selectedResources.length > 0) {
        context += `\n\nEl usuario está consultando específicamente sobre: ${selectedResources.join(', ')}.`;
        context += `\n\nINFORMACIÓN ESPECÍFICA DE LOS DOCUMENTOS INSTITUCIONALES:`;
        
        selectedResources.forEach(resource => {
            if (INSTITUTIONAL_KNOWLEDGE[resource]) {
                context += `\n\n=== ${INSTITUTIONAL_KNOWLEDGE[resource].title} ===`;
                context += INSTITUTIONAL_KNOWLEDGE[resource].content;
            }
        });
        
        context += `\n\nUsa ESPECÍFICAMENTE la información de los documentos anteriores para responder. Si la pregunta se relaciona con el contenido de estos documentos, cita la información exacta.`;
    } else {
        context += `\n\nEl usuario está realizando una consulta general sobre educación.
Puedes responder sobre cualquier tema educativo, pedagógico o relacionado con instituciones educativas católicas salesianas.
Si es relevante, puedes mencionar que la institución tiene documentos específicos como el Manual de Convivencia, PEI, etc.`;
    }

    context += `\n\nResponde de manera profesional, cálida y educativa. Mantén un tono respetuoso y pedagógico.`;

    try {
        let response;
        
        switch(provider) {
            case 'mistral':
                response = await fetch(providerConfig.baseUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: providerConfig.model,
                        messages: [
                            { role: 'system', content: context },
                            { role: 'user', content: message }
                        ],
                        max_tokens: 500, // Reducido para respuestas más rápidas
                        temperature: 0.7
                    })
                });
                break;
                
            case 'openai':
                response = await fetch(providerConfig.baseUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: providerConfig.model,
                        messages: [
                            { role: 'system', content: context },
                            { role: 'user', content: message }
                        ],
                        max_tokens: 500,
                        temperature: 0.7
                    })
                });
                break;
                
            case 'google':
                response = await fetch(`${providerConfig.baseUrl}?key=${apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: `${context}\n\nPregunta del usuario: ${message}` }]
                        }],
                        generationConfig: {
                            maxOutputTokens: 500,
                            temperature: 0.7
                        }
                    })
                });
                break;
                
            default:
                throw new Error(`Proveedor ${provider} no implementado`);
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Error ${response.status}: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        
        // Extraer respuesta según el proveedor
        switch(provider) {
            case 'mistral':
            case 'openai':
                if (!data.choices || !data.choices[0]) {
                    throw new Error('Respuesta inválida del servidor');
                }
                return data.choices[0].message.content;
                
            case 'google':
                if (!data.candidates || !data.candidates[0]) {
                    throw new Error('Respuesta inválida del servidor');
                }
                return data.candidates[0].content.parts[0].text;
                
            default:
                throw new Error('Proveedor no soportado');
        }
        
    } catch (error) {
        if (error.message.includes('API key')) {
            throw new Error('API Key inválida o sin permisos. Verifique su clave.');
        } else if (error.message.includes('quota')) {
            throw new Error('Límite de API alcanzado. Intente más tarde.');
        } else if (error.message.includes('network') || error.name === 'TypeError') {
            throw new Error('Error de conexión. Verifique su conexión a internet.');
        } else {
            throw new Error(`Error de ${providerConfig.name}: ${error.message}`);
        }
    }
}

function resetChat() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    chatMessages.innerHTML = `
        <div class="message assistant">
            <strong>🤖 Asistente IA:</strong> ¡Bienvenido al Portal Educativo de la Institución María Auxiliadora! 
            <br><br>
            Soy su consultor educativo inteligente. Puedo ayudarle con:
            <br>
            • 📋 Consultas sobre el Manual de Convivencia
            <br>
            • 🎯 Información del PEI y filosofía institucional
            <br>
            • 📅 Fechas y eventos del calendario escolar
            <br>
            • ⚖️ Normativas y legislación educativa
            <br>
            • 📊 Planes de estudio y metodologías
            <br>
            • 🔄 Procedimientos administrativos
            <br>
            • 💬 Consultas generales sobre educación
            <br><br>
            <strong>Para comenzar:</strong>
            <br>
            1️⃣ Configure su API Key arriba
            <br>
            2️⃣ Realice su consulta (puede seleccionar recursos específicos o hacer preguntas generales)
        </div>
    `;
}

/* ================================================
 * FUNCIONES DE CONFIGURACIÓN
 * ================================================ */

function saveConfiguration() {
    const apiProvider = document.getElementById('apiProvider');
    const apiKey = document.getElementById('apiKey');
    
    if (!apiProvider || !apiKey) return;
    
    const config = {
        apiProvider: apiProvider.value,
        apiKey: apiKey.value,
        selectedResources: selectedResources,
        timestamp: new Date().toISOString()
    };
    
    // Guardar en localStorage para persistencia
    localStorage.setItem('mariaAuxiliadoraConfig', JSON.stringify(config));
    showMessage('✅ Configuración guardada exitosamente', 'success');
    console.log('💾 Configuración guardada:', config);
}

function loadConfiguration() {
    try {
        const savedConfig = localStorage.getItem('mariaAuxiliadoraConfig');
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            
            // Restaurar configuración de API
            const apiProvider = document.getElementById('apiProvider');
            const apiKey = document.getElementById('apiKey');
            
            if (config.apiProvider && apiProvider) {
                apiProvider.value = config.apiProvider;
            }
            if (config.apiKey && apiKey) {
                apiKey.value = config.apiKey;
            }
            
            // Restaurar recursos seleccionados
            if (config.selectedResources && Array.isArray(config.selectedResources)) {
                selectedResources = [...config.selectedResources];
                // Marcar visualmente los recursos seleccionados
                selectedResources.forEach(resourceId => {
                    const card = document.querySelector(`[data-resource="${resourceId}"]`);
                    if (card) {
                        card.classList.add('selected');
                    }
                });
            }
            
            updateChatStatus();
            console.log('📂 Configuración cargada:', config);
            showMessage('📂 Configuración anterior restaurada', 'success');
        } else {
            // Si no hay configuración guardada, usar API Key por defecto de Mistral
            const apiKey = document.getElementById('apiKey');
            const apiProvider = document.getElementById('apiProvider');
            
            if (apiKey && !apiKey.value && apiProvider && apiProvider.value === 'mistral') {
                const defaultKey = CONFIG.aiProviders.mistral.defaultApiKey;
                if (defaultKey) {
                    apiKey.value = defaultKey;
                    console.log('🔑 Usando API Key por defecto de Mistral');
                    updateChatStatus();
                }
            }
        }
    } catch (error) {
        console.warn('⚠️ Error cargando configuración:', error);
        
        // Fallback: usar API Key por defecto de Mistral
        const apiKey = document.getElementById('apiKey');
        const apiProvider = document.getElementById('apiProvider');
        
        if (apiKey && !apiKey.value && apiProvider && apiProvider.value === 'mistral') {
            const defaultKey = CONFIG.aiProviders.mistral.defaultApiKey;
            if (defaultKey) {
                apiKey.value = defaultKey;
                console.log('🔑 Fallback: Usando API Key por defecto de Mistral');
                updateChatStatus();
            }
        }
    }
}

function exportConfiguration() {
    const apiProvider = document.getElementById('apiProvider');
    
    const config = {
        userType: currentUser?.type,
        apiProvider: apiProvider ? apiProvider.value : 'mistral',
        selectedResources: selectedResources,
        exportDate: new Date().toISOString(),
        portalVersion: '2.0'
    };
    
    const configJSON = JSON.stringify(config, null, 2);
    const blob = new Blob([configJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maria-auxiliadora-config-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showMessage('📥 Configuración exportada exitosamente', 'success');
    console.log('📤 Configuración exportada:', config);
}

function importConfiguration() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const config = JSON.parse(e.target.result);
                    
                    // Validar estructura del archivo
                    if (config.apiProvider && config.selectedResources !== undefined) {
                        // Aplicar configuración
                        const apiProvider = document.getElementById('apiProvider');
                        if (apiProvider) {
                            apiProvider.value = config.apiProvider;
                        }
                        
                        selectedResources = config.selectedResources || [];
                        
                        // Marcar recursos visualmente
                        document.querySelectorAll('.resource-card').forEach(card => {
                            card.classList.remove('selected');
                        });
                        selectedResources.forEach(resourceId => {
                            const card = document.querySelector(`[data-resource="${resourceId}"]`);
                            if (card) {
                                card.classList.add('selected');
                            }
                        });
                        
                        updateChatStatus();
                        showMessage('📂 Configuración importada exitosamente', 'success');
                        console.log('📥 Configuración importada:', config);
                    } else {
                        throw new Error('Formato de archivo inválido');
                    }
                } catch (error) {
                    showMessage('❌ Error al importar configuración: ' + error.message, 'error');
                    console.error('Error importing config:', error);
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function resetConfiguration() {
    if (confirm('¿Está seguro de restablecer toda la configuración? Esta acción no se puede deshacer.')) {
        // Limpiar localStorage
        localStorage.removeItem('mariaAuxiliadoraConfig');
        
        // Resetear formularios (Mistral por defecto)
        const apiProvider = document.getElementById('apiProvider');
        const apiKey = document.getElementById('apiKey');
        
        if (apiProvider) apiProvider.selectedIndex = 0;
        if (apiKey) apiKey.value = '';
        
        // Limpiar recursos seleccionados
        selectedResources = [];
        document.querySelectorAll('.resource-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Resetear chat
        resetChat();
        updateChatStatus();
        
        showMessage('🔄 Configuración restablecida', 'success');
        console.log('🔄 Configuración restablecida completamente');
    }
}

/* ================================================
 * FUNCIONES DE ADMINISTRACIÓN Y ESTADÍSTICAS
 * ================================================ */

function getSystemStatistics() {
    const apiKey = document.getElementById('apiKey');
    const apiProvider = document.getElementById('apiProvider');
    
    const stats = {
        totalUsers: Object.keys(CONFIG.users).length,
        totalResources: document.querySelectorAll('.resource-card').length,
        selectedResources: selectedResources.length,
        currentProvider: apiProvider ? apiProvider.value : 'mistral',
        hasApiKey: !!(apiKey && apiKey.value),
        sessionStart: sessionStorage.getItem('sessionStart') || new Date().toISOString(),
        lastActivity: new Date().toISOString()
    };
    
    console.log('📊 Estadísticas del sistema:', stats);
    showMessage('📊 Estadísticas mostradas en la consola. Presiona F12 para verlas.', 'info');
    return stats;
}

function generateSystemReport() {
    const stats = getSystemStatistics();
    const report = `
REPORTE DEL SISTEMA - PORTAL MARÍA AUXILIADORA
==============================================
Fecha: ${new Date().toLocaleString()}
Usuario actual: ${currentUser?.name || 'No autenticado'}
Tipo de usuario: ${currentUser?.type || 'N/A'}

CONFIGURACIÓN:
- Proveedor de IA: ${stats.currentProvider}
- API Key configurada: ${stats.hasApiKey ? 'Sí' : 'No'}
- Recursos seleccionados: ${stats.selectedResources}/${stats.totalResources}
- Recursos activos: ${selectedResources.join(', ') || 'Modo consultas generales'}

SESIÓN:
- Inicio de sesión: ${new Date(stats.sessionStart).toLocaleString()}
- Última actividad: ${new Date(stats.lastActivity).toLocaleString()}

SISTEMA:
- Usuarios disponibles: ${stats.totalUsers}
- Versión del portal: 2.0
- Estado: Operativo
- Modalidad: Consultas específicas y generales habilitadas
==============================================
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte-sistema-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    showMessage('📋 Reporte del sistema generado', 'success');
}

/* ================================================
 * FUNCIONES DE UTILIDAD Y MENSAJES
 * ================================================ */

function showMessage(message, type = 'info') {
    // Crear elemento de mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: inherit; cursor: pointer; font-size: 18px;">×</button>
        </div>
    `;
    
    // Insertar en el contenedor principal
    const mainContent = document.getElementById('mainContent');
    if (mainContent && mainContent.style.display !== 'none') {
        mainContent.insertBefore(messageDiv, mainContent.firstChild);
    } else {
        // Fallback para cuando no está en main content
        alert(message);
        return;
    }
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

/* ================================================
 * FUNCIONES DE LOGGING Y MONITOREO
 * ================================================ */

function logActivity(action, details = {}) {
    const activity = {
        timestamp: new Date().toISOString(),
        user: currentUser?.name || 'Anónimo',
        userType: currentUser?.type || 'N/A',
        action: action,
        details: details
    };
    
    // Guardar en sessionStorage para la sesión actual
    const activities = JSON.parse(sessionStorage.getItem('activities') || '[]');
    activities.push(activity);
    
    // Mantener solo las últimas 50 actividades
    if (activities.length > 50) {
        activities.splice(0, activities.length - 50);
    }
    
    sessionStorage.setItem('activities', JSON.stringify(activities));
    console.log('📝 Actividad registrada:', activity);
}

function getActivityLog() {
    return JSON.parse(sessionStorage.getItem('activities') || '[]');
}

/* ================================================
 * FUNCIONES DE DEBUG Y DESARROLLO
 * ================================================ */

// Funciones globales para debugging (disponibles en consola)
window.debugPortal = function() {
    console.log('=== DEBUG PORTAL MARÍA AUXILIADORA ===');
    console.log('Current User:', currentUser);
    console.log('Selected Resources:', selectedResources);
    console.log('Is Loading:', isLoading);
    console.log('Documents Loaded:', documentsLoaded);
    console.log('Config:', CONFIG);
    const apiKey = document.getElementById('apiKey');
    const provider = document.getElementById('apiProvider');
    console.log('API Key Present:', !!(apiKey && apiKey.value));
    console.log('Provider:', provider ? provider.value : 'N/A');
    console.log('Session Activities:', getActivityLog());
    console.log('System Stats:', getSystemStatistics());
    console.log('Mode:', selectedResources.length > 0 ? 'Recursos específicos' : 'Consultas generales');
    console.log('=== DOCUMENTOS CARGADOS ===');
    Object.keys(INSTITUTIONAL_KNOWLEDGE).forEach(key => {
        const doc = INSTITUTIONAL_KNOWLEDGE[key];
        console.log(`📄 ${key}:`, {
            title: doc.title,
            source: doc.source || 'ORIGINAL',
            contentLength: doc.content?.length || 0,
            loadedAt: doc.loadedAt || 'N/A'
        });
    });
    console.log('=====================================');
};

window.debugDocuments = function() {
    console.log('=== DEBUG DOCUMENTOS INSTITUCIONALES ===');
    console.log('Documents Loaded:', documentsLoaded);
    console.log('Total Documents:', Object.keys(INSTITUTIONAL_KNOWLEDGE).length);
    
    Object.entries(INSTITUTIONAL_KNOWLEDGE).forEach(([key, doc]) => {
        console.log(`\n📄 ${key.toUpperCase()}:`);
        console.log('  Título:', doc.title);
        console.log('  Fuente:', doc.source || 'ORIGINAL');
        console.log('  Contenido:', doc.content ? `${doc.content.length} caracteres` : 'Sin contenido');
        console.log('  Cargado:', doc.loadedAt || 'N/A');
        if (doc.error) console.log('  Error:', doc.error);
        if (doc.path) console.log('  Ruta:', doc.path);
    });
    console.log('========================================');
};

window.reloadDocuments = async function() {
    console.log('🔄 Recargando documentos...');
    showMessage('🔄 Recargando documentos PDF...', 'info');
    
    try {
        await initializeWithPDFs();
        console.log('✅ Documentos recargados exitosamente');
    } catch (error) {
        console.error('❌ Error recargando documentos:', error);
        showMessage('❌ Error recargando documentos', 'error');
    }
};

window.testConnection = async function() {
    const apiKey = document.getElementById('apiKey');
    const provider = document.getElementById('apiProvider');
    
    if (!apiKey || !apiKey.value) {
        console.log('❌ No API Key provided');
        showMessage('❌ Configure una API Key antes de probar la conexión', 'error');
        return;
    }
    
    const providerValue = provider ? provider.value : 'mistral';
    console.log(`🧪 Testing connection to ${providerValue}...`);
    showMessage(`🧪 Probando conexión con ${CONFIG.aiProviders[providerValue].name}...`, 'info');
    
    try {
        const response = await callAI('Test de conexión - responde solo "Conexión exitosa"', apiKey.value);
        console.log('✅ Connection successful!');
        console.log('Response:', response);
        showMessage('✅ ¡Conexión exitosa con la IA!', 'success');
        
        logActivity('CONNECTION_TEST_SUCCESS', { provider: providerValue });
    } catch (error) {
        console.log('❌ Connection failed:', error.message);
        showMessage(`❌ Error de conexión: ${error.message}`, 'error');
        
        logActivity('CONNECTION_TEST_FAILED', { provider: providerValue, error: error.message });
    }
};

window.showActivities = function() {
    const activities = getActivityLog();
    console.table(activities);
    
    if (activities.length === 0) {
        showMessage('📝 No hay actividades registradas en esta sesión', 'info');
    } else {
        showMessage(`📝 Se encontraron ${activities.length} actividades. Revisa la consola.`, 'info');
    }
};

window.clearActivities = function() {
    if (confirm('¿Desea limpiar el registro de actividades de esta sesión?')) {
        sessionStorage.removeItem('activities');
        showMessage('🧹 Registro de actividades limpiado', 'success');
    }
};

/* ================================================
 * FUNCIONES DE VALIDACIÓN
 * ================================================ */

function validateApiKey(provider, key) {
    const patterns = {
        openai: /^sk-[a-zA-Z0-9]{48,}$/,
        google: /^AIza[a-zA-Z0-9_-]{35}$/,
        mistral: /^[a-zA-Z0-9]{32}$/
    };
    return patterns[provider] ? patterns[provider].test(key) : key.length > 10;
}

/* ================================================
 * EVENT LISTENERS AVANZADOS
 * ================================================ */

function setupAdvancedEventListeners() {
    // Validación en tiempo real de API Key
    const apiKeyInput = document.getElementById('apiKey');
    if (apiKeyInput) {
        apiKeyInput.addEventListener('paste', function(e) {
            setTimeout(() => {
                const provider = document.getElementById('apiProvider');
                const key = this.value.trim();
                if (key && provider && !validateApiKey(provider.value, key)) {
                    showMessage('⚠️ Formato de API Key inválido para este proveedor', 'error');
                }
            }, 100);
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + Enter para enviar mensaje
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
        
        // Esc para limpiar chat
        const chatInput = document.getElementById('chatInput');
        if (e.key === 'Escape' && chatInput === document.activeElement) {
            if (confirm('¿Desea limpiar la conversación actual?')) {
                resetChat();
                chatInput.value = '';
            }
        }
    });
}

/* ================================================
 * FUNCIONES DE MANTENIMIENTO Y LIMPIEZA
 * ================================================ */

// Auto-save de configuración cada 5 minutos
setInterval(function() {
    if (currentUser) {
        const apiKey = document.getElementById('apiKey');
        if (apiKey && apiKey.value) {
            saveConfiguration();
            console.log('🔄 Auto-save de configuración realizado');
        }
    }
}, 300000); // 5 minutos

// Verificar estado de la API cada minuto (si hay API key)
setInterval(function() {
    const apiKey = document.getElementById('apiKey');
    if (apiKey && apiKey.value && currentUser) {
        // Verificación silenciosa del estado
        updateChatStatus();
    }
}, 60000); // 1 minuto

// Función de limpieza al cerrar la página
window.addEventListener('beforeunload', function(e) {
    if (currentUser) {
        // Guardar configuración antes de cerrar
        saveConfiguration();
        
        // Registrar cierre
        logActivity('PAGE_UNLOAD', {
            sessionDuration: Date.now() - new Date(sessionStorage.getItem('sessionStart')).getTime()
        });
    }
});

// Detectar inactividad (30 minutos)
let inactivityTimer;
const INACTIVITY_TIME = 30 * 60 * 1000; // 30 minutos

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(function() {
        if (currentUser) {
            showMessage('⏰ Sesión inactiva por 30 minutos. La configuración se ha guardado automáticamente.', 'info');
            logActivity('INACTIVITY_WARNING', {});
        }
    }, INACTIVITY_TIME);
}

// Eventos que resetean el timer de inactividad
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(function(name) {
    document.addEventListener(name, resetInactivityTimer, true);
});

// Inicializar timer de inactividad
resetInactivityTimer();

/* ================================================
 * FUNCIONES EXPERIMENTALES Y FUTURAS
 * ================================================ */

// Función para toggle de modo oscuro (experimental)
window.toggleDarkMode = function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    showMessage(isDark ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado', 'info');
};

// Cargar preferencia de modo oscuro
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Función para limpiar configuración incorrecta y resetear API Key
window.fixApiKey = function() {
    // Limpiar configuración incorrecta del localStorage
    localStorage.removeItem('mariaAuxiliadoraConfig');
    
    // Configurar API Key correcta
    const apiKey = document.getElementById('apiKey');
    const apiProvider = document.getElementById('apiProvider');
    
    if (apiKey && apiProvider) {
        apiProvider.value = 'mistral';
        apiKey.value = CONFIG.aiProviders.mistral.defaultApiKey;
        updateChatStatus();
        showMessage('🔧 API Key corregida y configuración limpiada', 'success');
        console.log('🔧 API Key corregida:', CONFIG.aiProviders.mistral.defaultApiKey);
    }
};

// Función para limpiar datos del portal
window.clearAllData = function() {
    if (confirm('¿Está seguro de eliminar TODOS los datos del portal? Esta acción no se puede deshacer.')) {
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
    }
};

// Función para exportar logs de actividad
window.exportActivityLog = function() {
    const activities = getActivityLog();
    if (activities.length === 0) {
        showMessage('📝 No hay actividades para exportar', 'info');
        return;
    }
    
    const logText = activities.map(activity => 
        `[${activity.timestamp}] ${activity.user} (${activity.userType}) - ${activity.action}: ${JSON.stringify(activity.details)}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `actividades-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    showMessage('📥 Log de actividades exportado', 'success');
};

// Función adicional para mostrar ayuda
window.showHelp = function() {
    const helpText = `
=== AYUDA DEL PORTAL MARÍA AUXILIADORA ===

CREDENCIALES DE ACCESO:
- Educador: educador2024
- Administrador: admin2024

CONFIGURACIÓN DE IA:
- Proveedor por defecto: Mistral AI
- Necesita API Key válida para funcionar

MODOS DE CONSULTA:
1. Consultas Generales: Sin seleccionar recursos
2. Consultas Específicas: Seleccionando uno o más recursos

RECURSOS DISPONIBLES:
- Manual de Convivencia
- Proyecto Educativo Institucional (PEI)
- Calendario Escolar
- Legislación Educativa
- Planes de Estudio
- Procedimientos Administrativos

ATAJOS DE TECLADO:
- Ctrl + Enter: Enviar mensaje
- Esc (en chat): Limpiar conversación

FUNCIONES DE DEBUG (consola):
- debugPortal(): Información del sistema
- testConnection(): Probar conexión con IA
- showActivities(): Ver actividades de la sesión
- clearActivities(): Limpiar registro de actividades
- showHelp(): Mostrar esta ayuda
- toggleDarkMode(): Alternar modo oscuro
- clearAllData(): Limpiar todos los datos
- exportActivityLog(): Exportar log de actividades

Para más información, consulte la documentación del sistema.
==========================================`;
    
    console.log(helpText);
    showMessage('📖 Ayuda mostrada en la consola. Presiona F12 para verla.', 'info');
};

/* ================================================
 * INICIALIZACIÓN FINAL Y VERIFICACIONES
 * ================================================ */

// Notificación de carga completa
window.addEventListener('load', function() {
    console.log('✅ Portal completamente cargado y listo');
    
    // Verificar compatibilidad del navegador
    if (!window.fetch) {
        showMessage('⚠️ Navegador no compatible. Use Chrome, Firefox, Safari o Edge moderno.', 'error');
    }
    
    // Mostrar información del portal
    console.log('📱 Portal María Auxiliadora v2.0 - Con soporte para consultas generales');
    console.log('🔧 Desarrollado para la Institución Educativa María Auxiliadora');
    console.log('📍 Cartago, Valle del Cauca, Colombia');
    console.log('📖 Recursos disponibles:', Object.keys(CONFIG?.users || {}));
    console.log('🤖 Proveedores de IA:', Object.keys(CONFIG?.aiProviders || {}));
    
    // Configurar event listeners avanzados después de la carga inicial
    setTimeout(setupAdvancedEventListeners, 1000);
});

/* ================================================
 * FIN DEL ARCHIVO SCRIPT.JS
 * PORTAL EDUCATIVO MARÍA AUXILIADORA
 * Versión 2.0 - Consultas específicas y generales
 * ================================================ */