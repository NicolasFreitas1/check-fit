-- CreateTable
CREATE TABLE "users" (
    "id_user" UUID NOT NULL,
    "nm_user" VARCHAR(250) NOT NULL,
    "ds_email" VARCHAR(250) NOT NULL,
    "vl_password" TEXT NOT NULL,
    "bl_is_admin" BOOLEAN NOT NULL DEFAULT false,
    "dt_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "gyms" (
    "id_gym" UUID NOT NULL,
    "nm_gym" VARCHAR(250) NOT NULL,
    "ds_gym" TEXT NOT NULL,
    "vl_phone" VARCHAR(15) NOT NULL,
    "vl_latitude" DECIMAL(65,30) NOT NULL,
    "vl_longitude" DECIMAL(65,30) NOT NULL,
    "dt_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gyms_pkey" PRIMARY KEY ("id_gym")
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id_check_in" UUID NOT NULL,
    "id_user" UUID NOT NULL,
    "id_gym" UUID NOT NULL,
    "dt_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id_check_in")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_ds_email_key" ON "users"("ds_email");

-- CreateIndex
CREATE INDEX "gyms_nm_gym_idx" ON "gyms"("nm_gym");

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_id_gym_fkey" FOREIGN KEY ("id_gym") REFERENCES "gyms"("id_gym") ON DELETE RESTRICT ON UPDATE CASCADE;
