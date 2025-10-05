export const PLATFORM_ROLES = [
  {
    name: "SuperAdmin",
    description:
      "Has unrestricted access to the entire platform. Can manage tenants, subscriptions, and core settings.",
    permissions: ["*"],
  },
  {
    name: "CoAdmin",
    description:
      "Manages day-to-day platform operations, including tenant lifecycle and support.",
    permissions: [
      "platform.tenant:create",
      "platform.tenant:read",
      "platform.tenant:update",
      "platform.tenant:suspend",
      "platform.tenant:impersonate",

      "platform.subscription:read",
      "platform.subscription:update",

      "platform.marketplace:moderate",
      "platform.marketplace:feature",

      "platform.support:manage_tickets",

      "platform.analytics:view_all",
    ],
  },

  {
    name: "FinanceAdmin",
    description:
      "Handles all financial aspects of the platform, including subscriptions and payouts.",
    permissions: [
      "platform.plans:create",
      "platform.plans:read",
      "platform.plans:update",

      "platform.billing:read",
      "platform.billing:manage",

      "platform.payouts:manage",
      "platform.commission:read",

      "platform.analytics:view_financials",
    ],
  },

  {
    name: "SupportAdmin",
    description:
      "Assists tenants with their issues and manages their accounts for support purposes.",
    permissions: [
      "platform.tenant:read",
      "platform.tenant:impersonate",
      "platform.support:manage_tickets",
      "platform.knowledgebase:manage",
    ],
  },

  {
    name: "AgencyAdmin",
    description:
      "Owner of a tenant (agency). Grants access to the agency workspace.",
    permissions: ["tenant:access_workspace"],
  },

  {
    name: "AgencyStaff",
    description:
      "A staff member of a tenant (agency). Grants access to the agency workspace.",
    permissions: ["tenant:access_workspace"],
  },
];


export const TENANT_DEFAULT_ROLES = [

  {
    name: "OrganizationAdmin",
    description:
      "Full administrative access to this agency's workspace. Manages team, tours, and finances.",
    isDefault: true,
    permissions: [
      "tenant.user:create",
      "tenant.user:read",
      "tenant.user:update",
      "tenant.user:delete",
      "tenant.role:create",
      "tenant.role:read",
      "tenant.role:update",
      "tenant.role:delete",

      "tenant.tour:create",
      "tenant.tour:read",
      "tenant.tour:update",
      "tenant.tour:delete",
      "tenant.tour:publish",


      "tenant.booking:create",
      "tenant.booking:read",
      "tenant.booking:update",
      "tenant.booking:cancel",
      "tenant.customer:read",
      "tenant.customer:update",

      "tenant.finance:view_reports",
      "tenant.invoice:manage",
      "tenant.expense:manage",
      "tenant.payout:read",
      "tenant.supplier:manage",
      "tenant.resource:manage", 
      "tenant.settings:manage",
    ],
  },

  {
    name: "TourManager",
    description:
      "Designs tours, manages itineraries, and handles operational logistics.",
    isDefault: true,
    permissions: [
      "tenant.tour:create",
      "tenant.tour:read",
      "tenant.tour:update",

      "tenant.guide:assign",
      "tenant.vehicle:assign",
      "tenant.supplier:read",

      "tenant.booking:read",
      "tenant.customer:read",
    ],
  },

  {
    name: "BookingAgent",
    description:
      "Manages customer inquiries, creates bookings, and handles payments.",
    isDefault: true,
    permissions: [
      "tenant.booking:create",
      "tenant.booking:read",
      "tenant.booking:update",
      "tenant.customer:create",
      "tenant.customer:read",
      "tenant.customer:update",
      "tenant.quotation:manage",
      "tenant.payment:record",

      "tenant.tour:read",
    ],
  },

  {
    name: "Accountant",
    description:
      "Handles invoicing, expenses, and financial reporting for the agency.",
    isDefault: true,
    permissions: [
      "tenant.finance:view_reports",
      "tenant.invoice:manage",
      "tenant.payment:read",
      "tenant.expense:manage",
      "tenant.payout:manage", 
    ],
  },

  {
    name: "TourGuide",
    description:
      "Has limited access to view details of tours they are assigned to.",
    isDefault: true,
    permissions: [
      "tenant.assigned_tour:read",
      "tenant.assigned_tour:view_participants",
      "tenant.assigned_tour:log_expense",
      "tenant.assigned_tour:update_status", 
      "tenant.communication:chat_with_manager",
      "tenant.communication:chat_with_participants",
    ],
  },
  {
    name: "Traveler",
    description: "The end-user who books tours through the marketplace.",
    isDefault: true,
    permissions: [
      "marketplace.tour:read",
      "marketplace.booking:create",
      "marketplace.my_bookings:read",
      "marketplace.my_bookings:cancel",
      "marketplace.review:create",
      "marketplace.profile:manage",
    ],
  },
];
