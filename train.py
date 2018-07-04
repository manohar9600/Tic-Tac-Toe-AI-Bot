import copy


# node in neural network -- A board state
class node:
    def __init__(self):
        self.values = {}
        self.board = [0 for i in range(9)]
        self.next_moves = [[]]
        self.next_conns = [[]]
        del(self.next_moves[0])
        del(self.next_conns[0])
        self.values['least'] = None
        self.values['perc'] = None

    def addchild(self, obj):
        self.next_conns.append(obj)

    def addParent(self, obj):
        self.parent = obj


def checkEmpty(board):
    for i in range(9):
        if board[i] == 0:
            return True
    return False


def nxtMoves(board):
    nxt = []
    for i in range(9):
        if board[i] == 0:
            nxt.append(i)
    return nxt


head = node()
head.addParent(None)
end_nodes = []
step = 0
prev = 0


def create_nn(neuron, player):
    global prev
    neuron.player = player
    global step
    step += 1
    tem = (step / 986410) * 100
    if int(tem) > int(prev):
        print(str(int(tem)))
    prev = tem
    if checkEmpty(neuron.board):
        nxt = nxtMoves(neuron.board)
        for pos in nxt:
            tp_board = []
            child = node()
            child.addParent(neuron)
            tp_board = copy.deepcopy(neuron.board)
            tp_board[pos] = player
            child.board = tp_board
            neuron.addchild(child)
            if player == 1:
                create_nn(child, 2)
            else:
                create_nn(child, 1)
    else:
        end_nodes.append(neuron)
        return


def pt(child):
    if child.parent is not None:
        print(child.board)
        pt(child.parent)
    else:
        print("ended")


winning_sets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6],
                [0, 3, 6], [1, 4, 7], [2, 5, 8]]


def checkwinner(board):
    player1 = []
    player2 = []
    for i in range(9):
        if board[i] == 1:
            player1.append(i)
        if board[i] == 2:
            player2.append(i)
    for item in winning_sets:
        if set(item) <= set(player1):
            return 1
    for item in winning_sets:
        if set(item) <= set(player2):
            return 2
    return 0


def backtrack(neuron, player):
    global prev
    global step
    step += 1
    tem = (step / 549946) * 100
    if int(tem) > int(prev):
        print(str(int(tem)))
    prev = tem
    winner = copy.deepcopy(checkwinner(neuron.board))
    if winner == 1:
        neuron.values['least'] = 2
        neuron.values['perc'] = 2
        return neuron.values
    elif winner == 2:
        neuron.values['least'] = -1
        neuron.values['perc'] = -1
        return neuron.values
    else:
        if not checkEmpty(neuron.board):
            neuron.values['least'] = 0
            neuron.values['perc'] = 0
            return neuron.values
    best_moves = [[]]
    del(best_moves[0])
    best = {}
    final = {}
    if player == 1:
        final['least'] = -2
        final['perc'] = 0
        total = 0
        ####change according to player
        best['least'] = -2
        best['perc'] = -2
        for child in neuron.next_conns:
            val = backtrack(child, 2)
            child.values = val
            if final['least'] < val['least']:
                final['least'] = copy.deepcopy(val['least'])
            total += val['perc']
            if best['least'] < val['least']:
                best = copy.deepcopy(val)
                del(best_moves[:])
                best_moves.append(child)
            elif best['least'] == val['least']:
                if best['perc'] < val['perc']:
                    best = copy.deepcopy(val)
                    del(best_moves[:])
                    best_moves.append(child)
                elif best['perc'] == val['perc']:
                    best_moves.append(child)
        ####finalising values
        final['perc'] = total / len(neuron.next_conns)
        #neuron.values = copy.deepcopy(final)
        neuron.next_moves = best_moves
        return final
    else:
        final['least'] = -2
        final['perc'] = 0
        total = 0
        ####change according to player
        best['least'] = 2
        best['perc'] = 2
        for child in neuron.next_conns:
            val = backtrack(child, 1)
            child.values = val
            if final['least'] < val['least']:
                final['least'] = copy.deepcopy(val['least'])
            total += val['perc']
            if best['least'] > val['least']:
                best = copy.deepcopy(val)
                del(best_moves[:])
                best_moves.append(child)
            elif best['least'] == val['least']:
                if best['perc'] > val['perc']:
                    best = copy.deepcopy(val)
                    del(best_moves[:])
                    best_moves.append(child)
                elif best['perc'] == val['perc']:
                    best_moves.append(child)
        ####finalising values
        final['perc'] = total / len(neuron.next_conns)
        #neuron.values = copy.deepcopy(final)
        neuron.next_moves = best_moves
        return final

f = open('data.txt', 'w')
visited = [[]]
del(visited[0])
def writeBoard(board):
    for i in board:
        f.write(str(i)+' ')

def writeTXT(neuron):
    if not neuron.board in visited:
        visited.append(neuron.board)
        writeBoard(neuron.board)
        for child in neuron.next_moves:
            f.write(" - ")
            writeBoard(child.board)
        f.write(' E ')
        for child in neuron.next_conns:
            writeTXT(child)


if __name__ == '__main__':
    create_nn(head, 1)
    step = 0
    prev = 0
    backtrack(head, 1)
    writeTXT(head)
    print('dne')
