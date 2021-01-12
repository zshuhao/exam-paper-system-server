import { query } from '../mysql/db'
import { successData, errorData } from '../utils/responseData'

export default class QuestionController {
    static async addQuestion(ctx) {
        const req = ctx.request.body
        const SQL = 'insert into question (q_content, q_explain, q_answer, q_type, q_level, department, course, profession, point) value (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        try {
            const res = await query(SQL,
                [
                    req.question,
                    req.analysis,
                    req.solution,
                    req.type,
                    req.level,
                    req.department,
                    req.course,
                    req.profession,
                    req.point
                ]
            )
            ctx.body = successData('添加成功！')
        } catch (error) {
            ctx.body = errorData('获取列表失败！')
        }
    }

    static async questionList(ctx) {
        const req = ctx.request.body
        // console.log(req);
        let SQL = 'SELECT * FROM question'
        const map = {
            questionType: 'q_type',
            difficulty: 'q_level',
            department: 'department',
            profession: 'profession',
            course: 'course'
        }
        const params = []
        for (const key in req) {
            if (Object.hasOwnProperty.call(req, key)) {
                const element = req[key]
                if (element !== '' && element !== 0 && key !== 'pageNo' && key !== 'pageSize') {
                    params.push(map[key] + '=' + element)
                }
            }
        }
        let search = ' where '
        if (params.length > 0) {
            search += params.join(' and ')
            SQL += search
        }
        const start = (req.pageNo - 1)*req.pageSize
        SQL += ' limit ?, ?;'
        // console.log(SQL);
        try {
            const res = await query(SQL, [start, req.pageSize])
            ctx.body = successData(res)
        } catch (error) {
            ctx.body = errorData('获取列表失败！')
        }
    }
}