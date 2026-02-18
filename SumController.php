<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class SumController
{
    #[Route('/api/sum', name: 'api_sum', methods: ['POST'])]
    public function sum(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $a = $data['a'] ?? null;
        $b = $data['b'] ?? null;

        if (!is_numeric($a) || !is_numeric($b)) {
            return new JsonResponse(
                ['error' => "Both 'a' and 'b' must be numeric."],
                400
            );
        }

        return new JsonResponse(['sum' => $a + $b]);
    }
}
