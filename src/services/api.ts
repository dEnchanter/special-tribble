
// export const baseUrl = 'https://fetspay.fetswallet.com'; // Test
export const baseUrl = 'https://fetspay.fetswallet.com';

// export const baseUrl = process.env.BASE_URL;

// export const apiVersionPath = 'request-api/v1/';
export const apiVersionPath = 'mm-request-api/v1/';
export const reportingApiVersionPath = 'reporting-api/v1/'
export const fileServerPath = 'file-server/api/v1';

export const Endpoint = {
  LOGIN: "wallet/users/system/login",
  ONBOARD: "wallet/users/system/onboard-admin",
  FETCH_CHANNELS: "channel",
  FETCH_SYSTEM_USERS: "wallet/users/system/all",
  FETCH_ROLES: "wallet/role-group/all",
  FETCH_PERMISSIONS: "wallet/permissions",
  FETCH_ROLE: "wallet/role-group/get-role",
  FETCH_ACCOUNT_HOLDERS: "wallet/account-holder/all",
  FETCH_TIER_CONFIG: "wallet/tier-config/all",
  FETCH_KYC_CONFIG: "wallet/kyc/config/kyc-requirements",
  FETCH_WALLET_TYPE: "wallet/wallet/config/wallet-type",
  FETCH_ACCOUNT_HOLDER_TYPE: "wallet/account-holder-type",
  FETCH_ACCOUNT_CATEGORY: "wallet/account-config/account-category/all",
  FETCH_PRODUCT_CATEGORY: "wallet/products/category/get/all",
  FETCH_PRODUCTS: "wallet/products/all",
  FETCH_CHARGE_PROFILE: "wallet/admin/charge-management/get-all-charge-profiles",
  FETCH_PAYMENT_METHOD: "wallet/payment-method/all",
  FETCH_ALL_LIEN_SETUP: "wallet/admin/lien/setup/all",
  FETCH_ALL_ACCOUNT_HOLDER_LIEN: "wallet/admin/lien/transaction/get-account-holder-liens",
  FETCH_INSTITUTION_CATEGORIES: "vas/institution-category/fetch",
  FETCH_BOUQUET_PRODUCT: "vas/product/fetch",
  FETCH_VAS_BILLER: "vas/biller/fetch",
  FETCH_INSTITUTIONS: "vas/institution/fetch",
  FETCH_INSTITUTION_INTEGRATIONS: "vas/institution-integration/fetch",
  FETCH_SERVICE_IDENTITY: "vas/service-identity/fetch",
  FETCH_ALL_TRANSACTIONS: "reporting/transactions/all/filter",
  FETCH_ALL_MERCHANTS_TRANSACTIONS_STATEMENT: "reporting/transactions/merchants/all/filter",
  FETCH_ALL_ACCOUNT_STATEMENT_TRANSACTIONS_BY_MSISDN: "reporting/statement/account/filter",
  FETCH_ALL_ACCOUNT_STATEMENT_TRANSACTIONS_BY_WALLET_ID: "/mm-request-api/v1/reporting/statement/account/wallet/filter",
  FETCH_TRANSACTIONS_SUMMARY: "reporting/analytics/transaction-performance",
  FETCH_TRANSACTIONS_ACCOUNT_HOLDER: "reporting/transactions/account/all/filter",
  FETCH_BANK_PAYMENT_TRANSACTIONS: "vas/bank-payment/report/fetch-transaction-history",
  FETCH_PENDING_TRANSACTIONS: "reporting/reports/transaction/all/pending",
  FETCH_EARNINGS: "reporting/reports/product/earnings/all",
  FETCH_APPROVAL_REQUESTS: "wallet/change-management/get-requests",
  FETCH_ACCOUNT_CATEGORY_SUMMARY: "reporting/reports/account-category-balance-summary/all",
  FETCH_PRODUCT_USAGE_SUMMARY: "reporting/reports/product-usage-summary",
  FETCH_PRODUCT_TRANSACTION_SUMMARY: "reporting/reports/products-transaction-summary/all",
  FETCH_ACCOUNT_TIER_DEPOSIT_SUMMARY: "reporting/reports/account-tier-deposit-summary/all",
  FETCH_PRODUCTS_REVENUE_SUMMARY: "reporting/reports/products-level-revenue-summary/all",
  FETCH_LOGS: "audit",
  FETCH_ACTOR_LOGS: "audit/get-actor-audits",
  FETCH_KEY_ACCOUNT: "vas/key-accounts-setup/get-key-account",
  INVITE_ADMIN: "wallet/users/system/invite-admin",
  CREATE_KYC_CONFIG: "wallet/kyc/config/kyc-requirements/add",
  ADD_TIER: "wallet/tier-config/create",
  CREATE_WALLET_TYPE: "wallet/wallet/config/wallet-type/create",
  ADD_PRODUCT_CATEGORY: "wallet/products/category/create",
  ADD_PRODUCT: "wallet/products/create",
  UPDATE_PRODUCT: "wallet/products/update",
  CREATE_ACCT_CATEGORY: "wallet/account-config/account-category/create-mapping",
  ACCT_HOLDER_CREATION: "wallet/account-holder/create",
  VALIDATE_ACCT_HOLDER: "wallet/account-holder/proza-web/en",
  ENABLE_USER: "wallet/account-holder/enable-user",
  DISABLE_USER: "wallet/account-holder/disable-user",
  ENABLE_VAS_BILLER: "vas/biller/enable",
  DISABLE_VAS_BILLER: "vas/biller/disable",
  ENABLE_BOUQUET_PRODUCT: "vas/product/enable",
  DISABLE_BOUQUET_PRODUCT: "vas/product/disable",
  COMMISSION_ROLLOVER: "wallet/billing/commission/roll-over",
  PND_USER: "wallet/account-holder/set-user-to-pnd",
  CREATE_CHARGE_PROFILE: "wallet/admin/charge-management/create-charge-profile",
  ADD_PAYMENT_METHOD: "wallet/payment-method/create",
  ADD_INSTITUTION_INTEGRATION: "vas/institution-integration/create",
  ADD_INSTITUTION: "vas/institution/create",
  ADD_INSTITUTION_CATEGORY: "vas/institution-category/create",
  ADD_LIEN_CONFIG: "wallet/admin/lien/setup/add-lien-config",
  ADD_LIEN_REQUEST: "wallet/admin/lien/transaction/lien-account-request",
  UPDATE_ACCOUNT_CATEGORY: "wallet/account-config/account-category/update",
  CREATE_BOUQUET_PRODUCT: "vas/product/create",
  CREATE_VAS_BILLER: "vas/biller/create",
  UPDATE_BOUQUET_PRODUCT: "vas/product/update",
  UPDATE_VAS_BILLER: "vas/biller/update",
  UPDATE_INSTITUTION: "vas/institution/update",
  UPDATE_LIEN_CONFIG: "wallet/admin/lien/setup/update-lien-config",
  CREATE_SERVICE_IDENTITY: "vas/service-identity/create",
  CREATE_ROLE: "wallet/role-group/create",
  UPDATE_ROLE: "wallet/role-group/update",
  CREATE_CHILD_ACCOUNT: "wallet/admin/account-management/account-holder/create-child-account",
  CREATE_EVALUE: "wallet/billing/e-value/create",
  CREATE_KEY_ACCOUNT: "wallet/billing/add/key-account",
  MANUAL_COMPLETION: "wallet/billing/manual-completion",
  MANUAL_COMPLETION2: "vas/manual-confirmation/bank-to-wallet/confirm-transactions",
  DEBIT_BANK_TRANSFER: "wallet/billing/e-value/remove",
  APPROVE_CHANGE_MANAGEMENT: "wallet/change-management/approve",
  DECLINE_CHANGE_MANAGEMENT: "wallet/change-management/decline",
  SEND_MONEY: "vas/key-accounts-setup/manual-sweep-account",
  POST_FILES: "files",
  VIEW_FILE: "files/view",
  DOWNLOAD_FILE: "files/download",
  UPDATE_KYC_CONFIG: "wallet/kyc/config/kyc-requirements/update",
  UPDATE_TIER: "wallet/tier-config/update",
  UPDATE_WALLET_TYPE: "wallet/wallet/config/wallet-type/update",
  UPDATE_ACCT_HOLDER: "wallet/admin/account-management/account-holder/update",
  REMOVE_PRODUCT: "wallet/products/remove",
  REMOVE_TIER_CONFIG: "wallet/tier-config/delete",
  REMOVE_WALLET_TYPE: "wallet/wallet/config/wallet-type/delete",
  BULK_UPLOAD_BOUQUET_PRODUCTS: "vas/bulk-create",
  REQUERY: "lookup/bill-payment/requery-payment",
  RECONCILIATION_UPLOAD: "reporting/reconciliation/upload",
  RESET_PASSWORD: "wallet/users/system/reset-password",
  CHANGE_PASSWORD: "wallet/users/system/change-password",
  NAME_ENQUIRY: "lookup/bank-payment/name-enquiry",
  INITIATE_REVERSAL: "wallet/billing/transactions/reverse",
  VALIDATE_TRANSACTION_STATUS: "reporting/transactions/validate-status",
  VALIDATE_TRANSACTION_STATUS_BULK: "reporting/transactions/validate-status/bulk",
  TRANSACTION_STATUS_QUERY: "vas/bank-payment/transaction-status-query",
  APPROVE_LIEN_REQUEST: "wallet/admin/lien/transaction/approve-lien-request",
  CANCEL_LIEN_REQUEST: "wallet/admin/lien/transaction/cancel-lien",
  LIEN_ACCOUNT_REQUEST: "wallet/admin/lien/transaction/lien-account-request",
};