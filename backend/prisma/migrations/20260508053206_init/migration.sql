-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('PRODUCTE', 'IA', 'AUTOMATITZACIONS', 'COMUNICACIO', 'INFORMES', 'SUPORT', 'OPERACIONAL');

-- CreateEnum
CREATE TYPE "BillingTypeLog" AS ENUM ('SETUP', 'MONTHLY', 'UPGRADE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT', 'VISITOR');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED', 'TRIAL');

-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "BillingType" AS ENUM ('MONTHLY', 'ANNUAL');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('NEW_CLIENT', 'ANNUAL_PAYMENT', 'REFERRAL_REFERRER', 'REFERRAL_NEW', 'MANUAL');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'PENDING', 'PAID', 'OVERDUE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AutomationStatus" AS ENUM ('INACTIVE', 'ACTIVE', 'PAUSED', 'ERROR');

-- CreateEnum
CREATE TYPE "ExecutionStatus" AS ENUM ('RUNNING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "NotificationEvent" AS ENUM ('WELCOME', 'INVOICE_GENERATED', 'PAYMENT_REMINDER_7', 'PAYMENT_REMINDER_30', 'USAGE_WARNING_80', 'USAGE_LIMIT_100', 'MAGIC_LINK', 'OAUTH_CONNECTED', 'PLAN_CHANGED', 'ONBOARDING_REMINDER');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "RAGDocStatus" AS ENUM ('PENDING', 'INDEXING', 'INDEXED', 'FAILED');

-- CreateEnum
CREATE TYPE "AIProviderType" AS ENUM ('GROQ', 'OLLAMA', 'OPENAI', 'ANTHROPIC');

-- CreateEnum
CREATE TYPE "DomainStatus" AS ENUM ('PENDING', 'VERIFIED', 'FAILED');

-- CreateEnum
CREATE TYPE "ConsentType" AS ENUM ('COOKIES_NECESSARY', 'COOKIES_ANALYTICS', 'COOKIES_MARKETING', 'DATA_PROCESSING', 'COMMUNICATIONS');

-- CreateEnum
CREATE TYPE "ExportStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "PhaseStatus" AS ENUM ('PENDING', 'PURCHASED', 'ACTIVE');

-- CreateEnum
CREATE TYPE "UpgradeType" AS ENUM ('ADJUSTMENT', 'FEATURE', 'REFACTOR');

-- CreateEnum
CREATE TYPE "UpgradeStatus" AS ENUM ('PENDING', 'ACCEPTED', 'ACTIVE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "BudgetStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'PARTIALLY_ACCEPTED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "BudgetPhaseStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "clientId" TEXT,
    "lastLogin" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "magic_link_tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "magic_link_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clientId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "details" JSONB,
    "ip" TEXT,
    "isTest" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" "ServiceCategory" NOT NULL DEFAULT 'PRODUCTE',
    "setupPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "monthlyPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "priceMonthly" DECIMAL(10,2) NOT NULL,
    "maxDomains" INTEGER NOT NULL DEFAULT 1,
    "maxUsers" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "maxConversations" INTEGER,
    "maxTokens" INTEGER,
    "maxAutomations" INTEGER,
    "maxIntegrations" INTEGER,
    "maxRagDocuments" INTEGER,
    "hasLandingPro" BOOLEAN NOT NULL DEFAULT false,
    "hasCustomDomain" BOOLEAN NOT NULL DEFAULT false,
    "hasRag" BOOLEAN NOT NULL DEFAULT false,
    "hasTelegram" BOOLEAN NOT NULL DEFAULT false,
    "extraConversationPrice" DECIMAL(10,4) NOT NULL DEFAULT 0.005,
    "extraTokenPrice" DECIMAL(10,6) NOT NULL DEFAULT 0.0001,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_services" (
    "planId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "plan_services_pkey" PRIMARY KEY ("planId","serviceId")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "nif" TEXT,
    "address" TEXT,
    "domain" TEXT,
    "logoUrl" TEXT,
    "notes" TEXT,
    "status" "ClientStatus" NOT NULL DEFAULT 'ACTIVE',
    "billingType" "BillingType" NOT NULL DEFAULT 'MONTHLY',
    "language" TEXT NOT NULL DEFAULT 'ca',
    "referralCode" TEXT,
    "referredById" TEXT,
    "isTest" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "demoUrl" TEXT,
    "status" "BudgetStatus" NOT NULL DEFAULT 'DRAFT',
    "totalSetup" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "totalMonthly" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "notes" TEXT,
    "expiresAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_phases" (
    "id" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "phaseId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "demoUrl" TEXT,
    "orderIndex" INTEGER NOT NULL,
    "setupPrice" DECIMAL(10,2) NOT NULL,
    "monthlyPrice" DECIMAL(10,2) NOT NULL,
    "isRecommended" BOOLEAN NOT NULL DEFAULT false,
    "status" "BudgetPhaseStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "budget_phases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_history" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "phaseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "monthlyPrice" DECIMAL(10,2) NOT NULL,
    "activatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3),

    CONSTRAINT "service_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing_history" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "invoiceId" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "type" "BillingTypeLog" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "billing_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flows" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phases" (
    "id" TEXT NOT NULL,
    "flowId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "baseHours" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "setupPrice" DECIMAL(10,2),
    "monthlyPrice" DECIMAL(10,2),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "phases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "automations" (
    "id" TEXT NOT NULL,
    "phaseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "automations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_flows" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "flowId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_flows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_phases" (
    "id" TEXT NOT NULL,
    "tenantFlowId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "orderIndex" INTEGER NOT NULL,
    "status" "PhaseStatus" NOT NULL DEFAULT 'PENDING',
    "setupPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "monthlyPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "setupPaid" BOOLEAN NOT NULL DEFAULT false,
    "isDelivered" BOOLEAN NOT NULL DEFAULT false,
    "deliveredAt" TIMESTAMP(3),
    "activatedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_phases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phase_delivery_logs" (
    "id" TEXT NOT NULL,
    "tenantPhaseId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "phase_delivery_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_automations" (
    "id" TEXT NOT NULL,
    "tenantPhaseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_automations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_upgrades" (
    "id" TEXT NOT NULL,
    "tenantPhaseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "UpgradeType" NOT NULL DEFAULT 'FEATURE',
    "setupPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "monthlyIncrease" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "status" "UpgradeStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_upgrades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_metrics" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leads" INTEGER NOT NULL DEFAULT 0,
    "responses" INTEGER NOT NULL DEFAULT 0,
    "bookings" INTEGER NOT NULL DEFAULT 0,
    "messagesSent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tenant_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_health" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "churnScore" INTEGER NOT NULL DEFAULT 0,
    "riskLevel" TEXT NOT NULL DEFAULT 'low',
    "lastCalculated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_health_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "planId" TEXT,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "renewsAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "priceMonthly" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "priceSetup" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_services" (
    "subscriptionId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "isExtra" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "activatedAt" TIMESTAMP(3),

    CONSTRAINT "subscription_services_pkey" PRIMARY KEY ("subscriptionId","serviceId")
);

-- CreateTable
CREATE TABLE "client_usage" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "conversationsUsed" INTEGER NOT NULL DEFAULT 0,
    "tokensUsed" INTEGER NOT NULL DEFAULT 0,
    "automationsUsed" INTEGER NOT NULL DEFAULT 0,
    "ragDocsUsed" INTEGER NOT NULL DEFAULT 0,
    "periodStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_history" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "planId" TEXT,
    "planName" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "reason" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oauth_states" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "oauth_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_credentials" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "encryptedVal" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount_policies" (
    "id" TEXT NOT NULL,
    "type" "DiscountType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "percentage" DECIMAL(5,2),
    "monthsFree" INTEGER,
    "durationMonths" INTEGER,
    "description" TEXT,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discount_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_discounts" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "type" "DiscountType" NOT NULL,
    "percentage" DECIMAL(5,2),
    "monthsFree" INTEGER,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "reason" TEXT,
    "appliedBy" TEXT,

    CONSTRAINT "client_discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'PENDING',
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "discountAmt" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "taxRate" DECIMAL(5,2) NOT NULL DEFAULT 21,
    "taxAmt" DECIMAL(10,2) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "notes" TEXT,
    "paidAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_items" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_landings" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "ctaText" TEXT NOT NULL DEFAULT 'Contacta''ns',
    "ctaUrl" TEXT,
    "logoGcsPath" TEXT,
    "logoUrl" TEXT,
    "primaryColor" TEXT NOT NULL DEFAULT '#FF6B00',
    "style" TEXT NOT NULL DEFAULT 'dark-tech',
    "fontPair" TEXT NOT NULL DEFAULT 'orbitron-rajdhani',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "slug" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_landings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_landing_sections" (
    "id" TEXT NOT NULL,
    "landingId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "title" TEXT,
    "config" JSONB NOT NULL DEFAULT '{}',
    "orderIndex" INTEGER NOT NULL,

    CONSTRAINT "client_landing_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_policies" (
    "id" TEXT NOT NULL,
    "minNoticeDays" INTEGER NOT NULL DEFAULT 30,
    "allowImmediateChange" BOOLEAN NOT NULL DEFAULT false,
    "notifyClientsOnChange" BOOLEAN NOT NULL DEFAULT true,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "onboarding_progress" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "currentPhaseId" TEXT,
    "day0SentAt" TIMESTAMP(3),
    "day1SentAt" TIMESTAMP(3),
    "day7SentAt" TIMESTAMP(3),
    "day15SentAt" TIMESTAMP(3),
    "day30SentAt" TIMESTAMP(3),
    "hasAccessed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "onboarding_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "automation_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL DEFAULT 'general',
    "workflowJson" JSONB NOT NULL,
    "requiredParams" JSONB NOT NULL DEFAULT '[]',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "automation_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_automations" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "n8nWorkflowId" TEXT,
    "status" "AutomationStatus" NOT NULL DEFAULT 'INACTIVE',
    "errorCount" INTEGER NOT NULL DEFAULT 0,
    "lastRunAt" TIMESTAMP(3),
    "lastError" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_automations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "automation_executions" (
    "id" TEXT NOT NULL,
    "automationId" TEXT NOT NULL,
    "n8nExecutionId" TEXT,
    "status" "ExecutionStatus" NOT NULL DEFAULT 'RUNNING',
    "tokensUsed" INTEGER NOT NULL DEFAULT 0,
    "durationMs" INTEGER,
    "error" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "automation_executions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rag_documents" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "gcsPath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL DEFAULT 'application/pdf',
    "sizeBytes" INTEGER NOT NULL DEFAULT 0,
    "status" "RAGDocStatus" NOT NULL DEFAULT 'PENDING',
    "chunkCount" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "indexedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rag_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whatsapp_bot_configs" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "botName" TEXT NOT NULL DEFAULT 'AssistentAMG',
    "greeting" TEXT NOT NULL,
    "tone" TEXT NOT NULL DEFAULT 'amable',
    "businessHours" TEXT,
    "faqs" JSONB NOT NULL DEFAULT '[]',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "whatsapp_bot_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telegram_bot_configs" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "botName" TEXT NOT NULL DEFAULT 'AssistentAMG',
    "telegramBotToken" TEXT,
    "greeting" TEXT NOT NULL,
    "tone" TEXT NOT NULL DEFAULT 'amable',
    "businessHours" TEXT,
    "faqs" JSONB NOT NULL DEFAULT '[]',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "telegram_bot_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_providers" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "provider" "AIProviderType" NOT NULL,
    "model" TEXT NOT NULL,
    "apiKeyEnc" TEXT,
    "apiKeyIv" TEXT,
    "apiKeyTag" TEXT,
    "baseUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_domains" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "status" "DomainStatus" NOT NULL DEFAULT 'PENDING',
    "dnsToken" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "lastChecked" TIMESTAMP(3),
    "errorMessage" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "type" "NotificationEvent" NOT NULL,
    "recipient" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "sentAt" TIMESTAMP(3),
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consent_logs" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "type" "ConsentType" NOT NULL,
    "granted" BOOLEAN NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "consent_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_export_requests" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "status" "ExportStatus" NOT NULL DEFAULT 'PENDING',
    "gcsPath" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "error" TEXT,

    CONSTRAINT "data_export_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "previewUrl" TEXT,
    "config" JSONB NOT NULL DEFAULT '{}',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing_template_sections" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "title" TEXT,
    "config" JSONB NOT NULL DEFAULT '{}',
    "orderIndex" INTEGER NOT NULL,

    CONSTRAINT "landing_template_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing_provider_configs" (
    "id" TEXT NOT NULL,
    "clientId" TEXT,
    "provider" TEXT NOT NULL,
    "apiKeyEnc" TEXT NOT NULL,
    "iv" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "billing_provider_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_clientId_idx" ON "users"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "magic_link_tokens_token_key" ON "magic_link_tokens"("token");

-- CreateIndex
CREATE INDEX "magic_link_tokens_token_idx" ON "magic_link_tokens"("token");

-- CreateIndex
CREATE INDEX "magic_link_tokens_email_idx" ON "magic_link_tokens"("email");

-- CreateIndex
CREATE INDEX "audit_logs_userId_idx" ON "audit_logs"("userId");

-- CreateIndex
CREATE INDEX "audit_logs_clientId_idx" ON "audit_logs"("clientId");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "services_name_key" ON "services"("name");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE INDEX "services_slug_idx" ON "services"("slug");

-- CreateIndex
CREATE INDEX "services_category_idx" ON "services"("category");

-- CreateIndex
CREATE UNIQUE INDEX "plans_name_key" ON "plans"("name");

-- CreateIndex
CREATE UNIQUE INDEX "plans_slug_key" ON "plans"("slug");

-- CreateIndex
CREATE INDEX "plans_slug_idx" ON "plans"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "clients_contactEmail_key" ON "clients"("contactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "clients_domain_key" ON "clients"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "clients_referralCode_key" ON "clients"("referralCode");

-- CreateIndex
CREATE INDEX "clients_contactEmail_idx" ON "clients"("contactEmail");

-- CreateIndex
CREATE INDEX "clients_domain_idx" ON "clients"("domain");

-- CreateIndex
CREATE INDEX "clients_referralCode_idx" ON "clients"("referralCode");

-- CreateIndex
CREATE INDEX "tenant_flows_tenantId_idx" ON "tenant_flows"("tenantId");

-- CreateIndex
CREATE INDEX "tenant_phases_tenantFlowId_idx" ON "tenant_phases"("tenantFlowId");

-- CreateIndex
CREATE INDEX "phase_delivery_logs_tenantPhaseId_idx" ON "phase_delivery_logs"("tenantPhaseId");

-- CreateIndex
CREATE INDEX "tenant_automations_tenantPhaseId_idx" ON "tenant_automations"("tenantPhaseId");

-- CreateIndex
CREATE INDEX "tenant_upgrades_tenantPhaseId_idx" ON "tenant_upgrades"("tenantPhaseId");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_metrics_tenantId_date_key" ON "tenant_metrics"("tenantId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_health_tenantId_key" ON "tenant_health"("tenantId");

-- CreateIndex
CREATE INDEX "subscriptions_clientId_idx" ON "subscriptions"("clientId");

-- CreateIndex
CREATE INDEX "subscriptions_status_idx" ON "subscriptions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "client_usage_clientId_key" ON "client_usage"("clientId");

-- CreateIndex
CREATE INDEX "plan_history_clientId_idx" ON "plan_history"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "oauth_states_state_key" ON "oauth_states"("state");

-- CreateIndex
CREATE INDEX "oauth_states_state_idx" ON "oauth_states"("state");

-- CreateIndex
CREATE INDEX "oauth_states_clientId_idx" ON "oauth_states"("clientId");

-- CreateIndex
CREATE INDEX "client_credentials_clientId_idx" ON "client_credentials"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "client_credentials_clientId_provider_key_key" ON "client_credentials"("clientId", "provider", "key");

-- CreateIndex
CREATE UNIQUE INDEX "discount_policies_type_key" ON "discount_policies"("type");

-- CreateIndex
CREATE INDEX "client_discounts_clientId_idx" ON "client_discounts"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_number_key" ON "invoices"("number");

-- CreateIndex
CREATE INDEX "invoices_clientId_idx" ON "invoices"("clientId");

-- CreateIndex
CREATE INDEX "invoices_status_idx" ON "invoices"("status");

-- CreateIndex
CREATE INDEX "invoices_issueDate_idx" ON "invoices"("issueDate");

-- CreateIndex
CREATE INDEX "invoice_items_invoiceId_idx" ON "invoice_items"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "client_landings_clientId_key" ON "client_landings"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "client_landings_slug_key" ON "client_landings"("slug");

-- CreateIndex
CREATE INDEX "client_landings_slug_idx" ON "client_landings"("slug");

-- CreateIndex
CREATE INDEX "client_landing_sections_landingId_idx" ON "client_landing_sections"("landingId");

-- CreateIndex
CREATE UNIQUE INDEX "onboarding_progress_clientId_key" ON "onboarding_progress"("clientId");

-- CreateIndex
CREATE INDEX "onboarding_progress_clientId_idx" ON "onboarding_progress"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "automation_templates_slug_key" ON "automation_templates"("slug");

-- CreateIndex
CREATE INDEX "automation_templates_slug_idx" ON "automation_templates"("slug");

-- CreateIndex
CREATE INDEX "client_automations_clientId_idx" ON "client_automations"("clientId");

-- CreateIndex
CREATE INDEX "client_automations_status_idx" ON "client_automations"("status");

-- CreateIndex
CREATE INDEX "automation_executions_automationId_idx" ON "automation_executions"("automationId");

-- CreateIndex
CREATE INDEX "automation_executions_status_idx" ON "automation_executions"("status");

-- CreateIndex
CREATE INDEX "rag_documents_clientId_idx" ON "rag_documents"("clientId");

-- CreateIndex
CREATE INDEX "rag_documents_status_idx" ON "rag_documents"("status");

-- CreateIndex
CREATE UNIQUE INDEX "whatsapp_bot_configs_clientId_key" ON "whatsapp_bot_configs"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "telegram_bot_configs_clientId_key" ON "telegram_bot_configs"("clientId");

-- CreateIndex
CREATE INDEX "ai_providers_clientId_idx" ON "ai_providers"("clientId");

-- CreateIndex
CREATE INDEX "ai_providers_provider_idx" ON "ai_providers"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "client_domains_domain_key" ON "client_domains"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "client_domains_dnsToken_key" ON "client_domains"("dnsToken");

-- CreateIndex
CREATE INDEX "client_domains_clientId_idx" ON "client_domains"("clientId");

-- CreateIndex
CREATE INDEX "client_domains_status_idx" ON "client_domains"("status");

-- CreateIndex
CREATE INDEX "notifications_recipient_idx" ON "notifications"("recipient");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_status_idx" ON "notifications"("status");

-- CreateIndex
CREATE INDEX "consent_logs_clientId_idx" ON "consent_logs"("clientId");

-- CreateIndex
CREATE INDEX "consent_logs_type_idx" ON "consent_logs"("type");

-- CreateIndex
CREATE INDEX "data_export_requests_clientId_idx" ON "data_export_requests"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "landing_templates_slug_key" ON "landing_templates"("slug");

-- CreateIndex
CREATE INDEX "landing_templates_slug_idx" ON "landing_templates"("slug");

-- CreateIndex
CREATE INDEX "landing_template_sections_templateId_idx" ON "landing_template_sections"("templateId");

-- CreateIndex
CREATE INDEX "billing_provider_configs_clientId_idx" ON "billing_provider_configs"("clientId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_services" ADD CONSTRAINT "plan_services_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_services" ADD CONSTRAINT "plan_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_phases" ADD CONSTRAINT "budget_phases_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_history" ADD CONSTRAINT "service_history_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_history" ADD CONSTRAINT "billing_history_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_history" ADD CONSTRAINT "billing_history_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phases" ADD CONSTRAINT "phases_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "flows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automations" ADD CONSTRAINT "automations_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "phases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_flows" ADD CONSTRAINT "tenant_flows_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_flows" ADD CONSTRAINT "tenant_flows_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "flows"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_phases" ADD CONSTRAINT "tenant_phases_tenantFlowId_fkey" FOREIGN KEY ("tenantFlowId") REFERENCES "tenant_flows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phase_delivery_logs" ADD CONSTRAINT "phase_delivery_logs_tenantPhaseId_fkey" FOREIGN KEY ("tenantPhaseId") REFERENCES "tenant_phases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_automations" ADD CONSTRAINT "tenant_automations_tenantPhaseId_fkey" FOREIGN KEY ("tenantPhaseId") REFERENCES "tenant_phases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_upgrades" ADD CONSTRAINT "tenant_upgrades_tenantPhaseId_fkey" FOREIGN KEY ("tenantPhaseId") REFERENCES "tenant_phases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_metrics" ADD CONSTRAINT "tenant_metrics_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant_health" ADD CONSTRAINT "tenant_health_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_services" ADD CONSTRAINT "subscription_services_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_services" ADD CONSTRAINT "subscription_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_usage" ADD CONSTRAINT "client_usage_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_history" ADD CONSTRAINT "plan_history_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oauth_states" ADD CONSTRAINT "oauth_states_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_credentials" ADD CONSTRAINT "client_credentials_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_discounts" ADD CONSTRAINT "client_discounts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_landings" ADD CONSTRAINT "client_landings_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_landing_sections" ADD CONSTRAINT "client_landing_sections_landingId_fkey" FOREIGN KEY ("landingId") REFERENCES "client_landings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onboarding_progress" ADD CONSTRAINT "onboarding_progress_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_automations" ADD CONSTRAINT "client_automations_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_automations" ADD CONSTRAINT "client_automations_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "automation_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automation_executions" ADD CONSTRAINT "automation_executions_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "client_automations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rag_documents" ADD CONSTRAINT "rag_documents_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatsapp_bot_configs" ADD CONSTRAINT "whatsapp_bot_configs_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telegram_bot_configs" ADD CONSTRAINT "telegram_bot_configs_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_providers" ADD CONSTRAINT "ai_providers_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_domains" ADD CONSTRAINT "client_domains_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consent_logs" ADD CONSTRAINT "consent_logs_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_export_requests" ADD CONSTRAINT "data_export_requests_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landing_template_sections" ADD CONSTRAINT "landing_template_sections_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "landing_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
