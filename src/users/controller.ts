import { JsonController, Get, Param, Put, Body, Post, HttpCode } from 'routing-controllers'
import User from './entity'
import { NotFoundError } from 'routing-controllers'

@JsonController()
export default class UserController {
    @Get('/users/:id')
    getPage(
        @Param('id') id: number
    ) {
        return User.findOne(id)
    }

    @Get('/users')
    async allPages() {
        const pages = await User.find()
        return { pages }
    }

    @Put('/users/:id')
    async updatePage(
        @Param('id') id: number,
        @Body() update: Partial<User>
    ) {
        const page = await User.findOne(id)
        if (!page) throw new NotFoundError('Cannot find page')

        return User.merge(page, update).save()
    }

    @Post('/users')
    @HttpCode(201)
    createPage(
        @Body() page: User
    ) {
        return page.save()
    }
}

