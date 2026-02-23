import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('開始建立種子資料...')

  // Create demo student user
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@demo.com' },
    update: {},
    create: {
      id: 'demo-student-001',
      email: 'student@demo.com',
      name: '陳子軒',
      role: UserRole.student,
      hashedPassword: 'demo-password-hash',
    },
  })
  console.log('✓ 學生用戶已建立:', studentUser.id)

  // Create demo advisor user
  const advisorUser = await prisma.user.upsert({
    where: { email: 'advisor@demo.com' },
    update: {},
    create: {
      id: 'demo-advisor-001',
      email: 'advisor@demo.com',
      name: '李顧問',
      role: UserRole.advisor,
      hashedPassword: 'demo-password-hash',
    },
  })
  console.log('✓ 顧問用戶已建立:', advisorUser.id)

  // Create student profile for demo student
  const studentProfile = await prisma.studentProfile.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      school: '優才書院',
      graduationYear: 2025,
      examSystem: 'DSE',
      targetMajor: '醫科 (Medicine)',
      targetUniversities: JSON.stringify(['香港大學', '中文大學', 'Imperial College London']),
      digitalTwinId: 'EDU-2025-0892-CZX',
      estimatedScore: 43,
      metrics: JSON.stringify({
        academicScore: 92,
        leadershipScore: 88,
        serviceScore: 85,
      }),
    },
  })
  console.log('✓ 學生檔案已建立:', studentProfile.id)

  // Create pathway plan
  const pathwayPlan = await prisma.pathwayPlan.create({
    data: {
      studentId: studentProfile.id,
      planJson: {
        options: [
          {
            id: 'hku-mbbs',
            label: '香港大學 內外全科醫學士 (MBBS)',
            university: '香港大學',
            program: 'MBBS',
            system: 'JUPAS',
            type: 'PRIMARY',
            admissionProbability: 0.78,
            band: 'Band A',
            notes: '根據預估成績與案例推算的錄取概率。',
          },
          {
            id: 'imperial-medical-biosciences',
            label: 'Imperial College Medical Biosciences',
            university: 'Imperial College London',
            program: 'Medical Biosciences',
            system: 'UCAS',
            type: 'PARALLEL',
            admissionProbability: 0.65,
            notes: '英國醫科相關課程，可作為平行申請選項。',
          },
          {
            id: 'cuhk-biomedical',
            label: '中文大學 生物醫學 (Biomedical Sciences)',
            university: '中文大學',
            program: 'Biomedical Sciences',
            system: 'JUPAS',
            type: 'SAFETY',
            admissionProbability: 0.92,
            band: 'Band B',
            notes: '保底選項，之後可考慮轉系至醫科。',
          },
        ],
      },
    },
  })
  console.log('✓ 升學路徑計畫已建立:', pathwayPlan.id)

  // Create deadline items
  const deadlines = await prisma.deadlineItem.createMany({
    data: [
      {
        studentId: studentProfile.id,
        label: 'UCAS 牛津 / 劍橋 申請截止',
        date: new Date('2024-10-15'),
        source: 'system',
        urgency: 'HIGH',
        completed: false,
      },
      {
        studentId: studentProfile.id,
        label: 'JUPAS 選科截止',
        date: new Date('2024-12-15'),
        source: 'system',
        urgency: 'MEDIUM',
        completed: false,
      },
      {
        studentId: studentProfile.id,
        label: '港大非本地生申請截止',
        date: new Date('2024-12-31'),
        source: 'system',
        urgency: 'MEDIUM',
        completed: false,
      },
    ],
  })
  console.log('✓ 截止日期項目已建立:', deadlines.count)

  // Create conversation
  const conversation = await prisma.conversation.create({
    data: {
      studentId: studentUser.id,
      title: '初次諮詢：港大醫科申請策略',
      messages: {
        create: [
          {
            role: 'assistant',
            agent: 'master',
            content: '你好陳子軒！我是你的專屬升學管家 Master Agent。我已經開始構建你的 Digital Twin，讓我為你分析最適合的升學路徑。',
          },
        ],
      },
    },
  })
  console.log('✓ 對話記錄已建立:', conversation.id)

  // Create counselor note
  const counselorNote = await prisma.counselorNote.create({
    data: {
      advisorId: advisorUser.id,
      studentId: studentUser.id,
      note: '陳子軒同學整體表現優秀，DSE 預估成績達到 43 分，超過港大醫科收生中位數。建議重點準備 MMI 面試，並考慮同時申請英國 Imperial College 作為平行選項。',
      riskLevel: '中等',
    },
  })
  console.log('✓ 顧問筆記已建立:', counselorNote.id)

  // Create additional demo students for advisor view
  const additionalStudents = [
    {
      email: 'student2@demo.com',
      name: '林思敏',
      school: '聖保羅男女中學',
      targetMajor: '法律 (Law)',
      estimatedScore: 28,
      graduationYear: 2025,
    },
    {
      email: 'student3@demo.com',
      name: '張懿天',
      school: '拔萃男書院',
      targetMajor: '工程 (Engineering)',
      estimatedScore: 38,
      graduationYear: 2025,
    },
  ]

  for (const studentData of additionalStudents) {
    const user = await prisma.user.create({
      data: {
        email: studentData.email,
        name: studentData.name,
        role: UserRole.student,
        hashedPassword: 'demo-password-hash',
        studentProfile: {
          create: {
            school: studentData.school,
            graduationYear: studentData.graduationYear,
            examSystem: 'DSE',
            targetMajor: studentData.targetMajor,
            targetUniversities: JSON.stringify(['香港大學', '中文大學']),
            estimatedScore: studentData.estimatedScore,
            metrics: JSON.stringify({
              academicScore: Math.floor(Math.random() * 20) + 75,
              leadershipScore: Math.floor(Math.random() * 20) + 75,
              serviceScore: Math.floor(Math.random() * 20) + 75,
            }),
          },
        },
      },
    })
    console.log(`✓ 額外學生已建立: ${user.name} (${user.id})`)
  }

  console.log('\n✅ 種子資料建立完成！')
  console.log('\nDemo 帳號:')
  console.log('  學生: student@demo.com')
  console.log('  顧問: advisor@demo.com')
}

main()
  .catch((e) => {
    console.error('種子資料建立失敗:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
