import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // private를 사용하여 외부에서 접근 금지, Board[] 형식으로 데이터 타입 선언
  /* 모든 board를 반환하는 getBoards 메서드 선언 */
  getAllBoards(): Board[] {
    // Board[] 형식으로 리턴값의 데이터 형식 선언
    return this.boards; // 모든 boards를 가져온다
  }
  /* 전달인자로 CreateBoardDTO를 갖는 보드를 생성하는 createBoard 메서드 선언 */
  createBoard(createBoardDto: CreateBoardDto) {
    /* title과 description은 구조분해 할당으로 createBoardDto에서 꺼내어서 사용해준다 */
    const { title, description } = createBoardDto;
    /* 만들어질 board는 Board 모델을 타입을 따른다 */
    const board: Board = {
      id: uuid(), // uuid 모듈을 이용한 유니크한 ID값 선언
      title, // title: title,
      description, // description: description,
      status: BoardStatus.PUBLIC, // status값은 BoardStatus.PUBLIC으로 초기화한다
    };
    this.boards.push(board); // boards 배열에 지금 board를 push 한다
    return board; // 현재 전달인자(title, description)값으로 만들어진 board를 생성한다
  }
  /* 전달인자로 id를 갖는 특정 ID 보드를 찾는 getBoardById 메서드 선언 */
  getBoardById(id: string): Board {
    // 전달인자로 받은 id와 일치하는 board 1개를 반환한다
    return this.boards.find((board) => board.id === id);
  }

  /* 전달인자로 id를 갖는 특정 ID 보드를 삭제하는 deleteBoard 메서드 선언 (리턴값이 없으므로 void 타입 사용) */
  deleteBoard(id: string): void {
    // 전달인자로 받은 id와 일치하는 board 1개를 제외 후 boards 배열을 재할당 해준다
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}
