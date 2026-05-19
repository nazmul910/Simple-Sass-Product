"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider     = \"prisma-client\"\n  output       = \"../generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel Tenant {\n  id        String   @id @default(uuid())\n  name      String\n  createdAt DateTime @default(now())\n\n  users User[]\n}\n\nmodel User {\n  id       String   @id @default(uuid())\n  email    String   @unique\n  password String\n  tenantId String\n  plan     PlanType @default(FREE)\n\n  planExpiry DateTime? @map(\"planeExpiry\")\n  tenant     Tenant    @relation(fields: [tenantId], references: [id])\n  payments   Payment[]\n  role       Role      @default(USER)\n}\n\nmodel Payment {\n  id        String   @id @default(uuid())\n  userId    String\n  amount    Int\n  tranId    String\n  createdAt DateTime @default(now())\n\n  user User @relation(fields: [userId], references: [id])\n}\n\nenum PlanType {\n  FREE\n  BASIC\n  STANDARD\n  PREMIUM\n}\n\nenum Role {\n  USER\n  ADMIN\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Tenant\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"users\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"TenantToUser\"}],\"dbName\":null},\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tenantId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"plan\",\"kind\":\"enum\",\"type\":\"PlanType\"},{\"name\":\"planExpiry\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"planeExpiry\"},{\"name\":\"tenant\",\"kind\":\"object\",\"type\":\"Tenant\",\"relationName\":\"TenantToUser\"},{\"name\":\"payments\",\"kind\":\"object\",\"type\":\"Payment\",\"relationName\":\"PaymentToUser\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"Role\"}],\"dbName\":null},\"Payment\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"amount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"tranId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"PaymentToUser\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"tenant\",\"user\",\"payments\",\"_count\",\"users\",\"Tenant.findUnique\",\"Tenant.findUniqueOrThrow\",\"Tenant.findFirst\",\"Tenant.findFirstOrThrow\",\"Tenant.findMany\",\"data\",\"Tenant.createOne\",\"Tenant.createMany\",\"Tenant.createManyAndReturn\",\"Tenant.updateOne\",\"Tenant.updateMany\",\"Tenant.updateManyAndReturn\",\"create\",\"update\",\"Tenant.upsertOne\",\"Tenant.deleteOne\",\"Tenant.deleteMany\",\"having\",\"_min\",\"_max\",\"Tenant.groupBy\",\"Tenant.aggregate\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"User.groupBy\",\"User.aggregate\",\"Payment.findUnique\",\"Payment.findUniqueOrThrow\",\"Payment.findFirst\",\"Payment.findFirstOrThrow\",\"Payment.findMany\",\"Payment.createOne\",\"Payment.createMany\",\"Payment.createManyAndReturn\",\"Payment.updateOne\",\"Payment.updateMany\",\"Payment.updateManyAndReturn\",\"Payment.upsertOne\",\"Payment.deleteOne\",\"Payment.deleteMany\",\"_avg\",\"_sum\",\"Payment.groupBy\",\"Payment.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"userId\",\"amount\",\"tranId\",\"createdAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"email\",\"password\",\"tenantId\",\"PlanType\",\"plan\",\"planExpiry\",\"Role\",\"role\",\"name\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "tQEdMAcHAABqACBAAABnADBBAAAOABBCAABnADBDAQAAAAFHQABpACFbAQBoACEBAAAAAQAgDAMAAHIAIAUAAHMAIEAAAG4AMEEAAAMAEEIAAG4AMEMBAGgAIVMBAGgAIVQBAGgAIVUBAGgAIVcAAG9XIlhAAHAAIVoAAHFaIgMDAACoAQAgBQAAqQEAIFgAAH4AIAwDAAByACAFAABzACBAAABuADBBAAADABBCAABuADBDAQAAAAFTAQAAAAFUAQBoACFVAQBoACFXAABvVyJYQABwACFaAABxWiIDAAAAAwAgAQAABAAwAgAABQAgCQQAAG0AIEAAAGsAMEEAAAcAEEIAAGsAMEMBAGgAIUQBAGgAIUUCAGwAIUYBAGgAIUdAAGkAIQEEAACnAQAgCQQAAG0AIEAAAGsAMEEAAAcAEEIAAGsAMEMBAAAAAUQBAGgAIUUCAGwAIUYBAGgAIUdAAGkAIQMAAAAHACABAAAIADACAAAJACABAAAABwAgAQAAAAMAIAEAAAABACAHBwAAagAgQAAAZwAwQQAADgAQQgAAZwAwQwEAaAAhR0AAaQAhWwEAaAAhAQcAAKYBACADAAAADgAgAQAADwAwAgAAAQAgAwAAAA4AIAEAAA8AMAIAAAEAIAMAAAAOACABAAAPADACAAABACAEBwAApQEAIEMBAAAAAUdAAAAAAVsBAAAAAQENAAATACADQwEAAAABR0AAAAABWwEAAAABAQ0AABUAMAENAAAVADAEBwAAmAEAIEMBAHkAIUdAAHsAIVsBAHkAIQIAAAABACANAAAYACADQwEAeQAhR0AAewAhWwEAeQAhAgAAAA4AIA0AABoAIAIAAAAOACANAAAaACADAAAAAQAgFAAAEwAgFQAAGAAgAQAAAAEAIAEAAAAOACADBgAAlQEAIBoAAJcBACAbAACWAQAgBkAAAGYAMEEAACEAEEIAAGYAMEMBAFEAIUdAAFMAIVsBAFEAIQMAAAAOACABAAAgADAZAAAhACADAAAADgAgAQAADwAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAJAwAAkwEAIAUAAJQBACBDAQAAAAFTAQAAAAFUAQAAAAFVAQAAAAFXAAAAVwJYQAAAAAFaAAAAWgIBDQAAKQAgB0MBAAAAAVMBAAAAAVQBAAAAAVUBAAAAAVcAAABXAlhAAAAAAVoAAABaAgENAAArADABDQAAKwAwCQMAAIUBACAFAACGAQAgQwEAeQAhUwEAeQAhVAEAeQAhVQEAeQAhVwAAggFXIlhAAIMBACFaAACEAVoiAgAAAAUAIA0AAC4AIAdDAQB5ACFTAQB5ACFUAQB5ACFVAQB5ACFXAACCAVciWEAAgwEAIVoAAIQBWiICAAAAAwAgDQAAMAAgAgAAAAMAIA0AADAAIAMAAAAFACAUAAApACAVAAAuACABAAAABQAgAQAAAAMAIAQGAAB_ACAaAACBAQAgGwAAgAEAIFgAAH4AIApAAABbADBBAAA3ABBCAABbADBDAQBRACFTAQBRACFUAQBRACFVAQBRACFXAABcVyJYQABdACFaAABeWiIDAAAAAwAgAQAANgAwGQAANwAgAwAAAAMAIAEAAAQAMAIAAAUAIAEAAAAJACABAAAACQAgAwAAAAcAIAEAAAgAMAIAAAkAIAMAAAAHACABAAAIADACAAAJACADAAAABwAgAQAACAAwAgAACQAgBgQAAH0AIEMBAAAAAUQBAAAAAUUCAAAAAUYBAAAAAUdAAAAAAQENAAA_ACAFQwEAAAABRAEAAAABRQIAAAABRgEAAAABR0AAAAABAQ0AAEEAMAENAABBADAGBAAAfAAgQwEAeQAhRAEAeQAhRQIAegAhRgEAeQAhR0AAewAhAgAAAAkAIA0AAEQAIAVDAQB5ACFEAQB5ACFFAgB6ACFGAQB5ACFHQAB7ACECAAAABwAgDQAARgAgAgAAAAcAIA0AAEYAIAMAAAAJACAUAAA_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-Thc_Tx0"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => __importStar(require('node:buffer')));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"))),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js")));
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map